
const USERS = "authUsers";
const SESSION = "authSession";

const getUsers = () => JSON.parse(localStorage.getItem(USERS) || "[]");

const show = id => {
  ["loginPage", "registerPage", "dashboardPage"].forEach(p =>
    document.getElementById(p).classList.toggle("hidden", p !== id)
  );
};

const msg = (id, text, type = "error") => {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = "message " + type;
};

const hex = b => [...b].map(x => x.toString(16).padStart(2, "0")).join("");

async function hash(password, salt) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(password),
    "PBKDF2", false, ["deriveBits"]
  );

  const bits = await crypto.subtle.deriveBits({
    name: "PBKDF2", salt,
    iterations: 210000, hash: "SHA-256"
  }, key, 256);

  return hex(new Uint8Array(bits));
}

// SWITCH PAGES
document.getElementById("showRegister").onclick = e => {
  e.preventDefault();
  show("registerPage");
};

document.getElementById("showLogin").onclick = e => {
  e.preventDefault();
  show("loginPage");
};

// REGISTER
document.getElementById("registerForm").onsubmit = async e => {
  e.preventDefault();

  const id = regIdentifier.value.trim().toLowerCase();
  const pass = regPassword.value;
  const users = getUsers();

  if (!id || !pass)
    return msg("regMessage", "All fields are required.");

  if (pass.length < 8 || !/\d/.test(pass))
    return msg("regMessage", "Password needs 8 characters and a number.");

  if (users.some(u => u.id === id))
    return msg("regMessage", "User already exists.");

  try {
    const salt = crypto.getRandomValues(new Uint8Array(16));

    users.push({ id, salt: hex(salt), passwordHash: await hash(pass, salt) });

    localStorage.setItem(USERS, JSON.stringify(users));

    localStorage.setItem(SESSION, JSON.stringify({ id }));
     document.getElementById("authMessage").innerHTML="Registered Successfully"
    welcomeUser.textContent = id;
    e.target.reset();
    show("dashboardPage");

    
  } catch {
    msg("regMessage", "Registration failed.");
  }
};

// LOGIN
document.getElementById("loginForm").onsubmit = async e => {
  e.preventDefault();

  const id = loginIdentifier.value.trim().toLowerCase();
  const pass = loginPassword.value;

  if (!id || !pass)
    return msg("loginMessage", "All fields are required.");

  try {
    const user = getUsers().find(u => u.id === id);
    if (!user) throw Error();

    const salt = new Uint8Array(
      user.salt.match(/.{2}/g).map(x => parseInt(x, 16))
    );

    if (await hash(pass, salt) !== user.passwordHash) throw Error();

    localStorage.setItem(SESSION, JSON.stringify({ id }));
    welcomeUser.textContent = id;
    e.target.reset();
    
    document.getElementById("authMessage").innerHTML="Logged in Successfully"
      show("dashboardPage");
  } catch {
    msg("loginMessage", "Invalid username/email or password.");
  }
};

// PROTECT DASHBOARD
function checkLogin() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION));
    const user = getUsers().find(u => u.id === session?.id);
    if (!user) throw Error();

    welcomeUser.textContent = user.id;
    show("dashboardPage");
  } catch {
    localStorage.removeItem(SESSION);
    show("loginPage");
  }
}

// LOGOUT
logoutButton.onclick = () => {
  localStorage.removeItem(SESSION);
  loginForm.reset();
  show("loginPage");
};

checkLogin();

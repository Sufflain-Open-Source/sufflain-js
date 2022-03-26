const groupIdKey = 'gid';
const userNameKey = 'una';
const storage = window.localStorage;

function getGroup() {
    get(groupIdKey);
}

function getName() {
    get(userNameKey);
}

function get(key) {
    storage.getItem(key);
}

function setGroup() {
    set(groupIdKey);
}

function setName() {
    set(userNameKey);
}

function set(key) {
    storage.setItem(key);
}

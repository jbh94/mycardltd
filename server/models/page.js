const db = require('../utils/database');

module.exports = class Page {
    constuctor(title, body, user) {
        this.title = title;
        this.body = body;
        this.user = user;
    }

static fetchAll() {
    return db.execute(`SELECT * FROM pages`);
}

static save(page) {
    return db.execute(
        `INSERT INTO pages (title, body, user) VALUES (?, ?, ?)`, [page.title, page.body, page.user]
    );
}

static delete(id) {
    return db.execute(`DELETE FROM pages WHERE id = ?`, [id]);
}

};
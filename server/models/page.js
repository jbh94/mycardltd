const db = require('../utils/database');

module.exports = class Page {
    constuctor(title, body, user, uniqueUrlSuffix) {
        this.title = title;
        this.body = body;
        this.user = user;
        this.uniqueUrlSuffix = uniqueUrlSuffix;
    }

static fetchAll() {
    return db.execute(`SELECT * FROM pages`);
}

static save(page) {
    return db.execute(
        `INSERT INTO pages (title, body, user, uniqueUrlSuffix) VALUES (?, ?, ?, ?)`, [page.title, page.body, page.user, page.uniqueUrlSuffix]
    );
}

static delete(id) {
    return db.execute(`DELETE FROM pages WHERE id = ?`, [id]);
}

};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const express = require('express');
module.exports = (app) => {
    app.use('/public', express.static(path.join(__dirname, '../../../frontend/public')));
};
//# sourceMappingURL=static.js.map
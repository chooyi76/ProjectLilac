"use strict";
const bcrypt = require ('bcrypt');
const queryString = require('query-string');
const { data, query } = require("../../config/logger");
const logger = require("../../config/logger");
const User = require("../../models/User");
const Will = require("../../models/Will");

const output = {
  home: (req, res) => {
    logger.info(`GET / 304 "홈 화면으로 이동"`);
    res.render("home/index");
  },

  login: (req, res) => {
    logger.info(`GET /login 304 "로그인 화면으로 이동"`);
    res.render("home/login");
  },

  register: (req, res) => {
    logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
    res.render("home/register");
  },

  will: (req, res) => {
    logger.info(`GET /will 304 "유언장 작성 페이지"`);
    res.render("home/willwrite");
  },
  loginpass: (req, res) => {
    logger.info(`GET / 304 "로그인 후 홈 화면으로 이동"`);
    res.render("home/index_pass");
  },
  willup: async (req, res) => {
    logger.info(`GET /willupdate 304 "유언장 조회 페이지"`);
    
  
   const adr = new Will(req.query);
   const data = await adr.willrt(req.query);
    res.render("home/willupdate",{savedwill: data});
    //console.log(data);
  }
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();

    const url = {
      method: "POST",
      path: "/login",
      status: response.err ? 400 : 200,
    };

    log(response, url);
    return res.status(url.status).json(response);
  },

  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();

    const url = {
      method: "POST",
      path: "/register",
      status: response.err ? 409 : 201,
    };

    log(response, url);
    return res.status(url.status).json(response);
  },

  will: async (req, res) => {
    const wl = new Will(req.body);
    const response = await wl.will();

    const url = {
      method: "POST",
      path: "/willwrite",
      status: response.err ? 409 : 201,
    };

    log(response, url);
    //var tt = res.status(url.status).json(response);
    //console.log(tt);
    return res.status(url.status).json(response);
  },
  willupdate: async (req, res) => {
    const wl = new Will(req.body);
    const response = await wl.willsave2();

    const url = {
      method: "POST",
      path: "/willupdate",
      status: response.err ? 409 : 201,
    };

    log(response, url);
    //var tt = res.status(url.status).json(response);
    //console.log(tt);
    return res.status(url.status).json(response);
  },
};

module.exports = {
  output,
  process,
};

const log = (response, url) => {
  if (response.err) {
    logger.error(
      `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.err}`
    );
  } else {
    logger.info(
      `${url.method} ${url.path} ${url.status} Response: ${response.success} ${
        response.msg || ""
      }`
    );
  }
};

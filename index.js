"use strict";
// Copyright ©2025 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:65628177162971409215 LICENSE.md

// Physics Deva
import Deva from '@indra.ai/deva';

import pkg from './package.json' with {type:'json'};
const {agent,vars} = pkg.data;

// set the __dirname
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';    
const __dirname = dirname(fileURLToPath(import.meta.url));

const info = {
  id: pkg.id,
  license: pkg.license,
  VLA: pkg.VLA,
  name: pkg.name,
  describe: pkg.description,
  version: pkg.version,
  url: pkg.homepage,
  dir: __dirname,
  git: pkg.repository.url,
  bugs: pkg.bugs.url,
  author: pkg.author,
  copyright: pkg.copyright,
};

const PHYSICS = new Deva({
  info,
  agent,
  vars,
  utils: {
    translate(input) {return input.trim();},
    parse(input) {return input.trim();},
    process(input) {return input.trim();}
  },
  listeners: {},
  modules: {},
  func: {
    async aspect(opts) {
      const estr = `aspect:${opts.type}:${opts.key}:${opts.packet.id.uid}`;
      this.context(opts.key, opts.packet.id.uid);
      this.action('func', estr);
      
      const {key, name, warning} = this.vars[opts.type][opts.key];
      
      this.vars.status = key;
      this.vars.warning = warning;
      this.state('await', estr);
      const uid = await this.methods.uid(opts.packet);

      this.vars.status = false;
      this.vars.warning = false;

      this.action('return', estr); // set action return
      this.state('valid', estr);
      this.intent('good', estr);
      return uid;
    },
    async router(type, packet) {
      this.context(type, packet.id.uid);
      this.action('func', `router:${type}:${packet.id.uid}`);
      const key = packet.q.meta.params.pop();
      
      const opts = {key, type, packet};
      this.state('await', `${key}:${packet.id.uid}`); // set action return
      return await this.func.aspect(opts);      
    }
  },

  methods: {
    async element(packet) {
      this.action('method', `elements:${packet.id.uid}`);
      return await this.func.router('elements', packet);
    },
    async concept(packet) {
      this.action('method', `concepts:${packet.id.uid}`);
      return await this.func.router('concepts', packet);
    },
  },
  onInit(data, resolve) {
    const {personal} = this.license(); // get the license config
    const agent_license = this.info().VLA; // get agent license
    const license_check = this.license_check(personal, agent_license); // check license
    // return this.start if license_check passes otherwise stop.
    return license_check ? this.start(data, resolve) : this.stop(data, resolve);
  }, 
  onReady(data, resolve) {
    const {concerns, global} = this.license(); // get the license config
    const {VLA} = this.info();

    this.prompt(`${this.vars.messages.ready} > VLA:${VLA.uid}`);
    return resolve(data); // resolve data.
  },
  onError(err, data) {
    this.prompt(this.vars.messages.error);
    console.log(err);
  },
});
export default PHYSICS;

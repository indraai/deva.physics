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
    async aspect(type, idx, packet) {
      this.vars.status = this.vars[type][idx].toLowerCase();
      const uid = await this.methods.uid(packet);
      this.vars.status = false;
      return uid;
    }
  },
  methods: {
    async ether(packet) {
      return await this.func.aspect('elements', 0, packet);
    },
    async wind(packet) {
      return await this.func.aspect('elements', 1, packet);
    },
    async fire(packet) {
      return await this.func.aspect('elements', 2, packet);
    },
    async water(packet) {
      return await this.func.aspect('elements', 3, packet);
    },
    async earth(packet) {
      return await this.func.aspect('elements', 4, packet);
    },
    async quantum(packet) {
      return await this.func.aspect('concepts', 0, packet);
    },
    async isotropic(packet) {
      return await this.func.aspect('concepts', 1, packet);
    },
    async kinetic(packet) {
      return await this.func.aspect('concepts', 2, packet);
    },
    async cymatic(packet) {
      return await this.func.aspect('concepts', 3, packet);
    },
    async particle(packet) {
      return await this.func.aspect('concepts', 4, packet);
    },
    async gravity(packet) {
      return await this.func.aspect('concepts', 5, packet);
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

"use strict";
// Copyright ©2025 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:65628177162971409215 LICENSE.md

const {expect} = require('chai')
const PhysicsDeva = require('./index.js');

describe(PhysicsDeva.me.name, () => {
  beforeEach(() => {
    return PhysicsDeva.init()
  });
  it('Check the DEVA Object', () => {
    expect(PhysicsDeva).to.be.an('object');
    expect(PhysicsDeva).to.have.property('agent');
    expect(PhysicsDeva).to.have.property('vars');
    expect(PhysicsDeva).to.have.property('listeners');
    expect(PhysicsDeva).to.have.property('methods');
    expect(PhysicsDeva).to.have.property('modules');
  });
})

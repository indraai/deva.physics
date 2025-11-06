"use strict";
// Copyright ©2025 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:43276891006421414765 LICENSE.md

const {expect} = require('chai')
const RecursionDeva = require('./index.js');

describe(RecursionDeva.me.name, () => {
  beforeEach(() => {
    return RecursionDeva.init()
  });
  it('Check the DEVA Object', () => {
    expect(RecursionDeva).to.be.an('object');
    expect(RecursionDeva).to.have.property('agent');
    expect(RecursionDeva).to.have.property('vars');
    expect(RecursionDeva).to.have.property('listeners');
    expect(RecursionDeva).to.have.property('methods');
    expect(RecursionDeva).to.have.property('modules');
  });
})

// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//
// Flags: --allow-natives-syntax

var list = [];
function log(item) { list.push(item); }
async function f() {
  try {
    let namespace = await import(/a/);
  } catch(e) {
    log(1);
  }
}
f();

async function g() {
  try {
    let namespace = await import({ get toString() { return undefined; }});
  } catch(e) {
    log(2);
  }
}
g();
  %RunMicrotasks();
assertEquals(list, [1,2]);

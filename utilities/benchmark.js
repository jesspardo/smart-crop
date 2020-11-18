class Benchmark {
  constructor() {
    this.startDate = new Date();
    this.hrstartDate = process.hrtime();
  }

  start() {
    this.startDate = new Date();
    this.hrstartDate = process.hrtime();
  }

  stop(msg = 'Execution time (hr)') {
    const hrend = process.hrtime(this.hrstartDate);
    console.info(`${msg} hr: %ds %dms`, hrend[0], hrend[1] / 1000000);
  }
}

module.exports = Benchmark;
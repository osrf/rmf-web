/**
 * Order by severity
 */
export var LogLevel;
(function (LogLevel) {
  LogLevel['Fatal'] = 'fatal';
  LogLevel['Error'] = 'error';
  LogLevel['Warn'] = 'warn';
  LogLevel['Info'] = 'info';
  LogLevel['Debug'] = 'debug';
  LogLevel['Trace'] = 'trace';
  LogLevel['All'] = 'all';
})(LogLevel || (LogLevel = {}));

var options = {
  useEasing: true, 
  useGrouping: true, 
  separator: ',', 
  decimal: '.', 
};
var demo = new CountUp('myTargetElement', 0, 4923313, 0, 4, options);
if (!demo.error) {
  demo.start();
} else {
  console.error(demo.error);
}
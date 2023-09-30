import childProcess from "child_process";

export function genDocRoute(info) {
  return new Promise((resolve, reject) => {
    // info = JSON.stringify(info) // 对象会报错
    childProcess.exec(
      `node ./scripts/gdr.js ${info.name} ${info.title} ${info.category}`,
      (err, stdout, stderr) => {
        console.log(err, stdout, stderr);
        if (err) {
          console.log("生成文档路由失败：", err);
        } else {
          console.log(stdout);
        }
      }
    );
  });
}

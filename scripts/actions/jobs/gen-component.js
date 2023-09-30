import childProcess from "child_process";

export function genComponent(name) {
  return new Promise((resolve, reject) => {
    childProcess.exec(
      `node ./scripts/gc.js ${name}`,
      (err, stdout, stderr) => {
        console.log(err, stdout, stderr);
        if (err) {
          console.log('创建组件失败：',err)
          reject(false);
        } else {
          console.log(stdout)
          resolve(name);
        }
      }
    );
  });
}

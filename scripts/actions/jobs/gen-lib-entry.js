import childProcess from "child_process";

export function genLibEntry() {
  console.log("create lib-entry file.");
  return new Promise((resolve, reject) => {
    childProcess.exec(
      `node ./scripts/build-entry.js`,
      (err, stdout, stderr) => {
        console.log(err, stdout, stderr);
        if (err) {
          console.log('生成入口文件失败:', err)
          reject(err);
        } else {
          console.log(stdout)
          resolve();
        }
      }
    );
  });
}

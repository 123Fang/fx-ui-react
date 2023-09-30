import React, { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js';
const isDev = import.meta.env.MODE === "development";


export type codeVoewProps = {
  path: string;
  showView?: boolean;
  showCopy?: boolean;
  showCode?: boolean;
};
export default function CodeView(props: codeVoewProps) {
  const { path, showView, showCopy, showCode } = props;
  console.log('path', path)
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [code, setCode] = useState('');
  const [openCode, setOpenCode] = useState(showCode || false);

  useEffect(() => {
    /**
     *  开发环境：走vite开发服务器来处理
     *  生产环境: 依赖AST，会把动态import中的变量匹配成glob通配符,然后1去把匹配到的文件打包成独立的chunk,2 再生成一个url映射 3 用请求替换import 
     * 
     * **/
    if (isDev) {
      const filePath = `/src/demo/${path}.tsx?raw`;
      const s = import(/* @vite-ignore */ filePath);
      s.then((res) => {
        setCode(res.default);
      });
    } else {
      const [p1, p2] = path.split('/')
      // 遇到?raw，vite的插件来处理
      const s = import(/* @vite-ignore */ `../demo/${p1}/${p2}.tsx?raw`);
      s.then((res) => {
        setCode(res.default);
      });
    }
  }, []);

  useEffect(() => {
    // 配置 highlight.js
    hljs.configure({
      // 忽略未经转义的 HTML 字符
      ignoreUnescapedHTML: true,
      languages: [
        'javascript',
        'css',
        'python',
        'html',
        'bash',
        'java',
        'sql',
        'json',
        'http',
        'go',
        'c++',
        'c#',
      ],
    });
    // 获取到内容中所有的code标签
    setTimeout(() => {
      const codes = document.querySelectorAll('pre code');
      codes.forEach((el) => {
        // 让code进行高亮
        hljs.highlightElement(el as HTMLElement);
      });
    }, 500);
  }, []);

  const copyCode = () => {
    inputRef.current.value = code;
    inputRef.current.select();
    if (document.execCommand("copy")) {
      document.execCommand("copy");
      alert('代码复制成功')
    } else {
      alert('代码复制成功')
    }
  }
  return (
    <>
      <div className="fx-react-ui-codeview" style={{ height: openCode ? 'auto' : '0px' }}>
        <pre>
          <code>{code}</code>
        </pre>
        {
          showCopy ? <div className="copyCode" onClick={copyCode}>
            <i className="m-icon-copy" />
          </div> : null
        }

      </div>
      {
        showView ? <div className="viewCodeToggle" onClick={() => setOpenCode(!openCode)} style={{ borderTop: openCode ? 'none' : '1px solid #0000000f' }}>
          <span>{openCode ? '隐藏代码' : '显示代码'}</span><i className="m-icon-code" />
        </div> : null
      }

      <textarea id="inputCopy" ref={inputRef} />
    </>
  );
}
CodeView.defaultProps = {
  showView: true,
  showCopy: true,
  showCode: false,
}

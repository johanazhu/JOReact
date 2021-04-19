

const createElement = (tag, attrs, ...children) => {
    // console.log('tag', tag)
    // console.log('attrs', attrs)
    // console.log('children', children)
    return {
        tag,
        attrs,
        children
    }
}

const JoReact = {
    createElement
}

// const element = (
//     <div>
//         hello<span onClick={() => {
//             console.log(1111)
//         }}>world!</span>
//     </div>
// )

// console.log('element', element)

/*
** ReactDOM.render(
 *   <h1>Hello, world!</h1>,
 *   document.getElementById('root')
 * );
 * vnode: jsx 转换后的对象
 * container：被挂载的节点
***/ 
// 将虚拟dom挂载与真实dom映射
const render = (vnode, container) => {

    console.log('vnode', vnode)
    console.log('container', container)

    // 当vode为string类型时，渲染一段文本
    if (typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode);
        return container.appendChild(textNode);
    }

    const dom = document.createElement( vnode.tag );

    if (vnode.attrs) {
        Object.keys(vnode.attrs).forEach( key => {
            const value = vnode.attrs[key]
            setAttribute(dom, key, value) // 设置属性
        })
    }

    vnode.children.forEach( child => render(child, dom)) // 递归
 
    return container.appendChild(dom) // 渲染到真实 dom 上
}

const setAttribute = (dom, name, value) => {
    // 如果属性名是className，则改回 class
    if (name === 'className') name = 'class'

    // 如果属性名是 onXXX，则是一个事件监听方法
    if (/on\w+/.test(name)) {
        name = name.toLowerCase();
        dom[name] = value || ''
    } 
    // 如果属性名是 style，则赋值 style 对象
    else if (name === 'style') {
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || ''
        } else if (value && typeof value === 'object') {
            for (let name in value) {
                // 这里需要做很多工作，
                // 例如 通过 style={ width: 20 } 这种形式来设置，可以省略单位px
                dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px' : value[name]
            }
        }
    }
    // 普通属性则直接赋值
    else {
        if (name in dom) {
            dom[name] = name || ''
        }
        if (value) {
            dom.setAttribute(name, value)
        } else {
            dom.removeAttribute(name)
        }
    }
}

const ReactDOM = {
    render: (vnode, container) => {
        container.innerHTML = '';
        return render(vnode, container)
    }
}

ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);


// function tick() {
//     const element = (
//         <div>
//             <h1>Hello, world!</h1>
//             <h2>It is {new Date().toLocaleTimeString()}.</h2>
//         </div>
//       );
//     ReactDOM.render(
//         element,
//         document.getElementById( 'root' )
//     );
// }

// setInterval( tick, 1000 );


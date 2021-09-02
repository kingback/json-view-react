import React, { useRef, useState, useEffect } from 'react';
import cx from 'classnames';
import './index.css';

function typeOf(o) {
  return Object.prototype.toString
    .call(o)
    .match(/\[object\s([a-zA-Z]+)\]/)[1]
    .toLowerCase();
}

function isBasicType(t) {
  return t !== 'object' && t !== 'array';
}

function Code({ prop, value, comma, root, expandAll, collapseAll }) {
  const type = typeOf(value);
  const basic = isBasicType(type);
  const keys = type === 'object' ? Object.keys(value) : [];
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  function onCollapserClick() {
    setCollapsed(!collapsed);
  }

  function onMouseOver(e) {
    e.stopPropagation(true);
    setHovered(true);
  }

  function onMouseOut(e) {
    e.stopPropagation(true);
    setHovered(false);
  }

  useEffect(() => {
    setCollapsed(!!collapseAll || !expandAll);
  }, [expandAll, collapseAll]);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current.contains(e.target) && !e.selectedHandled) {
        e.selectedHandled = true;
        setSelected(true);
      } else {
        setSelected(false);
      }
    }
    document.addEventListener('click', onDocClick, false);
    return () => {
      document.removeEventListener('click', onDocClick, false);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cx({
        'json-view-block': true,
        'json-view-hovered': hovered,
        'json-view-selected': selected,
        'json-view-collapsed': !root && collapsed
      })}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {prop != null ? (
        <span className="json-view-property">{prop + ': '}</span>
      ) : null}
      {!basic && !root ? (
        <div className="json-view-collapser" onClick={onCollapserClick} />
      ) : null}
      {!basic ? (
        <span className="json-view-tag json-view-tag-open">
          {type === 'array' ? '[' : '{'}
        </span>
      ) : null}
      {!basic ? <span className="json-view-ellipsis" /> : null}
      {basic ? (
        <span className={`json-view-value json-view-${type}`}>
          {JSON.stringify(value)}
        </span>
      ) : null}
      {type === 'array' ? (
        <ul className="json-view-array json-view-collapsible">
          {value.map((v, i) => (
            <li key={i} className="json-view-item">
              <Code
                value={v}
                comma={i !== value.length - 1}
                expandAll={expandAll}
                collapseAll={collapseAll}
              />
            </li>
          ))}
        </ul>
      ) : null}
      {type === 'object' ? (
        <ul className="json-view-object json-view-collapsible">
          {keys.map((k, i) => (
            <li key={i} className="json-view-item">
              <Code
                prop={k}
                value={value[k]}
                comma={i !== keys.length - 1}
                expandAll={expandAll}
                collapseAll={collapseAll}
              />
            </li>
          ))}
        </ul>
      ) : null}
      {!basic ? (
        <span className="json-view-tag json-view-tag-close">
          {type === 'array' ? ']' : '}'}
        </span>
      ) : null}
      {comma ? <span className="json-view-comma">,</span> : null}
    </div>
  );
}

export default function JSONView({ json, style, className, toolbox = true }) {
  const [expandAll, setExpandAll] = useState(1);
  const [collapseAll, setCollapseAll] = useState(0);

  function onExpandClick() {
    setExpandAll(expandAll + 1);
    setCollapseAll(0);
  }

  function onCollapseClick() {
    setExpandAll(0);
    setCollapseAll(collapseAll + 1);
  }

  return (
    <div className={`json-view-container ${className}`} style={style}>
      <Code value={json} expandAll={expandAll} collapseAll={collapseAll} root />
      {toolbox ? (
        <div className="json-view-toolbox">
          <span className="json-view-expand-all" onClick={onExpandClick}>
            +
          </span>
          <span className="json-view-collapsed-all" onClick={onCollapseClick}>
            -
          </span>
        </div>
      ) : null}
    </div>
  );
}

import React, { useRef, useState, useEffect } from 'react';
import cx from 'classnames';
import './index.css';

function typeOf(o) {
  return Object.prototype.toString.call(o).match(/\[object\s([a-zA-Z]+)\]/)[1].toLowerCase();
}

function isBasicType(t) {
  return t !== 'object' && t !== 'array';
}

function Code(_ref) {
  var prop = _ref.prop,
      value = _ref.value,
      comma = _ref.comma,
      root = _ref.root,
      expandAll = _ref.expandAll,
      collapseAll = _ref.collapseAll;
  var type = typeOf(value);
  var basic = isBasicType(type);
  var keys = type === 'object' ? Object.keys(value) : [];
  var ref = useRef(null);

  var _useState = useState(false),
      hovered = _useState[0],
      setHovered = _useState[1];

  var _useState2 = useState(false),
      selected = _useState2[0],
      setSelected = _useState2[1];

  var _useState3 = useState(false),
      collapsed = _useState3[0],
      setCollapsed = _useState3[1];

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

  useEffect(function () {
    setCollapsed(!!collapseAll || !expandAll);
  }, [expandAll, collapseAll]);
  useEffect(function () {
    function onDocClick(e) {
      if (ref.current.contains(e.target) && !e.selectedHandled) {
        e.selectedHandled = true;
        setSelected(true);
      } else {
        setSelected(false);
      }
    }

    document.addEventListener('click', onDocClick, false);
    return function () {
      document.removeEventListener('click', onDocClick, false);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: cx({
      'json-view-block': true,
      'json-view-hovered': hovered,
      'json-view-selected': selected,
      'json-view-collapsed': !root && collapsed
    }),
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut
  }, prop != null ? /*#__PURE__*/React.createElement("span", {
    className: "json-view-property"
  }, prop + ': ') : null, !basic && !root ? /*#__PURE__*/React.createElement("div", {
    className: "json-view-collapser",
    onClick: onCollapserClick
  }) : null, !basic ? /*#__PURE__*/React.createElement("span", {
    className: "json-view-tag json-view-tag-open"
  }, type === 'array' ? '[' : '{') : null, !basic ? /*#__PURE__*/React.createElement("span", {
    className: "json-view-ellipsis"
  }) : null, basic ? /*#__PURE__*/React.createElement("span", {
    className: "json-view-value json-view-" + type
  }, JSON.stringify(value)) : null, type === 'array' ? /*#__PURE__*/React.createElement("ul", {
    className: "json-view-array json-view-collapsible"
  }, value.map(function (v, i) {
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "json-view-item"
    }, /*#__PURE__*/React.createElement(Code, {
      value: v,
      comma: i !== value.length - 1,
      expandAll: expandAll,
      collapseAll: collapseAll
    }));
  })) : null, type === 'object' ? /*#__PURE__*/React.createElement("ul", {
    className: "json-view-object json-view-collapsible"
  }, keys.map(function (k, i) {
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "json-view-item"
    }, /*#__PURE__*/React.createElement(Code, {
      prop: k,
      value: value[k],
      comma: i !== keys.length - 1,
      expandAll: expandAll,
      collapseAll: collapseAll
    }));
  })) : null, !basic ? /*#__PURE__*/React.createElement("span", {
    className: "json-view-tag json-view-tag-close"
  }, type === 'array' ? ']' : '}') : null, comma ? /*#__PURE__*/React.createElement("span", {
    className: "json-view-comma"
  }, ",") : null);
}

export default function JSONView(_ref2) {
  var json = _ref2.json,
      style = _ref2.style,
      className = _ref2.className,
      _ref2$toolbox = _ref2.toolbox,
      toolbox = _ref2$toolbox === void 0 ? true : _ref2$toolbox;

  var _useState4 = useState(1),
      expandAll = _useState4[0],
      setExpandAll = _useState4[1];

  var _useState5 = useState(0),
      collapseAll = _useState5[0],
      setCollapseAll = _useState5[1];

  function onExpandClick() {
    setExpandAll(expandAll + 1);
    setCollapseAll(0);
  }

  function onCollapseClick() {
    setExpandAll(0);
    setCollapseAll(collapseAll + 1);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "json-view-container " + className,
    style: style
  }, /*#__PURE__*/React.createElement(Code, {
    value: json,
    expandAll: expandAll,
    collapseAll: collapseAll,
    root: true
  }), toolbox ? /*#__PURE__*/React.createElement("div", {
    className: "json-view-toolbox"
  }, /*#__PURE__*/React.createElement("span", {
    className: "json-view-expand-all",
    onClick: onExpandClick
  }, "+"), /*#__PURE__*/React.createElement("span", {
    className: "json-view-collapsed-all",
    onClick: onCollapseClick
  }, "-")) : null);
}
import React from 'react';

const LinearProgressBar = props => {
  let {
    percent = 0, // number: 0 - 1, inclusive. Fill %
    width = 100, // the width of our meter
    height = 10, // the height of our meter
    rounded = true, // if true, use rounded corners
    backgroundColor, // the background color
    fillColor, // the fill color
    animate = false, // if true, animate
    label = null // a label for accessibility
  } = props;

  let r = rounded ? Math.ceil(height / 2) : 0;
  let w = percent ? Math.max(height, width * Math.min(percent, 1)) : 0;

  return (
    <svg width={width} height={height} aria-label={label} display="block">
      {backgroundColor && (
        <rect
          width={width}
          height={height}
          fill={backgroundColor}
          rx={r}
          ry={r}
        />
      )}
      <rect width={w} height={height} fill={fillColor} rx={r} ry={r}>
        {animate && (
          <animate
            attributeName="width"
            attributeType="CSS"
            begin="0s"
            dur="1s"
            from="0"
            to={w}
          />
        )}
      </rect>
    </svg>
  );
};

export default LinearProgressBar;

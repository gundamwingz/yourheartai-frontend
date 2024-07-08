export const dark = {
  color: [
    '#486de8',
    '#e07f9d',
    '#018977',
    '#b088f5',
    '#c55305',
    '#8ea9ff',
    '#ffb0c8',
    '#40bfa9',
  ],
  backgroundColor: 'rgba(0,0,0,0)',
  title: {
    textStyle: {
      color: 'var(--color-foreground-secondary-text)',
    },
    subtextStyle: {
      color: '#aaaaaa',
    },
  },
  line: {
    itemStyle: {
      borderWidth: 1,
    },
    lineStyle: {
      width: 2,
    },
    symbolSize: 4,
    symbol: 'circle',
    smooth: false,
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#eeeeee',
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#eeeeee',
      },
    },
    axisLabel: {
      show: true,
      color: '#eeeeee',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#aaaaaa'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#eeeeee'],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#eeeeee',
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#eeeeee',
      },
    },
    axisLabel: {
      show: true,
      color: '#eeeeee',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#aaaaaa'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#eeeeee'],
      },
    },
  },
  grid: {
    backgroundColor: 'var(--mdc-filled-text-field-container-color)',
    show: true,
  },
  toolbox: {
    iconStyle: {
      borderColor: '#999999',
    },
    emphasis: {
      iconStyle: {
        borderColor: '#666666',
      },
    },
  },
  legend: {
    textStyle: {
      color: 'var(--color-foreground-secondary-text)',
    },
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#eeeeee',
        width: '1',
      },
      crossStyle: {
        color: '#eeeeee',
        width: '1',
      },
      label: {
        color: 'white',
        backgroundColor: 'var(--color-primary)',
      },
    },
  },
};

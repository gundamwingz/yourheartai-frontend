import { BarChart, LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';
import { dark } from './dark.theme';
import { light } from './light.theme';

echarts.use([
  BarChart,
  LineChart,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  MarkLineComponent,
]);

echarts.registerTheme('dark', dark);
echarts.registerTheme('light', light);

export default echarts;

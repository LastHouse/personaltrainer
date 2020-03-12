import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  text: {
    margin: 2,
    padding: theme.spacing(2),
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    elevation: 0,
    spacing: 4,
    alignContent: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  pie: {
    padding: theme.spacing(0),
    elevation: 0,
    spacing: 4,
    alignContent: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

export default function Statistics() {
  const [workouts, setWorkouts] = useState([]);
  const classes = useStyles();

  useEffect(() => fetchAllWorkouts(), []);

  const fetchAllWorkouts = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setWorkouts(data));
  };

  const result = _(workouts)
    .groupBy(x => x.activity)
    .map((value, key) => ({
      activity: key,
      totalamount: _.sumBy(value, 'duration')
    }))
    .value();

  const data = result.map(data => ({
    name: data.activity,
    value: data.totalamount
  }));

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#ff99ff',
    '#ffff66',
    '#b3e6b3',
    '#e6194b',
    '#3cb44b',
    '#ffe119',
    '#4363d8',
    '#f58231',
    '#911eb4',
    '#46f0f0',
    '#f032e6',
    '#bcf60c',
    '#fabebe',
    '#008080',
    '#e6beff',
    '#9a6324',
    '#fffac8',
    '#800000',
    '#aaffc3',
    '#808000',
    '#ffd8b1',
    '#000075',
    '#808080',
    '#ffffff',
    '#000000'
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs sm={8}>
          <Paper className={classes.text}>
            <h1>Stats</h1>
            <p>
              On the right you can see a pie cahart of your upcoming activities.{' '}
              <br></br>
              <br></br>
              By hovering over the chart you can see activity minutes by
              activity type.
            </p>
            <Divider />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
              dicta illo, esse tenetur ea itaque rem quos. Suscipit ducimus
              excepturi ea ratione. Fugit dolorum obcaecati omnis at quam ullam
              nam aut quis eligendi, neque ad, consequuntur, eaque modi! Odio
              voluptatibus, voluptatem libero itaque quas maiores, doloribus
              consequuntur sit qui quasi hic dolor, vitae ea a provident
              assumenda? Hic harum nobis asperiores inventore itaque ab culpa
              deserunt debitis, maxime, nemo ad nesciunt odio minus, sequi
              corporis consectetur? Nam vitae facilis cumque quis molestiae
              accusantium culpa expedita officiis impedit repudiandae a,
              consequuntur sint, explicabo facere ipsa atque enim neque. Itaque
              eaque iusto hic optio dignissimos. Minima quae aperiam labore
              aliquid. Quae illo cum, non dolorem saepe doloribus aliquid totam.
            </p>
            <Divider />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper className={classes.pie}>
            <PieChart width={400} height={400}>
              <Tooltip />
              <Pie
                data={data}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    margin: 2,
    padding: 2,
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
        spacing={3}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        >
        <Grid item xs={12}>
          <Paper className={classes.paper}>Statistics of future workouts</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit et
            eveniet, enim laborum autem laboriosam quis, minus quas repellat
            nesciunt exercitationem minima dolore, dolorum esse. Nemo sint iusto
            odio tempora.
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <PieChart width={600} height={600}>
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

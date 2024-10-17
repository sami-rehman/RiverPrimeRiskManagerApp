import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import HighchartsSankey from 'highcharts/modules/sankey';
import HighchartsOrganization from 'highcharts/modules/organization';
import Highcharts from 'highcharts';

if (typeof Highcharts === 'object') {
  HighchartsSankey(Highcharts);
  HighchartsOrganization(Highcharts);
}

const RulesHighcharts = () => {
  const options = {
    chart: {
      backgroundColor: 'white',
      height: 800,
      style: {
        width: '100%',
        height: '100%',
      }
    },
    accessibility: {
      point: {
        descriptionFormat:
          '{toNode.name} {#if (eq toNode.level 1 )} is a distinct family within the order of {fromNode.id}. {toNode.custom.info}{/if} {#if (eq toNode.level 2 )} is a genus within the {fromNode.id}. {toNode.custom.info} {/if} {#if (eq toNode.level 3 )} is a species within the {fromNode.id}. {toNode.custom.info} {/if}',
      },
    },
    series: [
      {
        type: 'organization',
        name: 'Carnivora Phylogeny',
        keys: ['from', 'to'],
        data: [
          ['Carnivora', 'Felidae'],
          ['Carnivora', 'Mustelidae'],
          ['Carnivora', 'Canidae'],
          ['Felidae', 'Panthera'],
          ['Mustelidae', 'Taxidea'],
          ['Mustelidae', 'Lutra'],
          ['Panthera', 'Panthera pardus'],
          ['Taxidea', 'Taxidea taxus'],
          ['Lutra', 'Lutra lutra'],
          ['Canidae', 'Canis'],
          ['Canis', 'Canis latrans'],
          ['Canis', 'Canis lupus'],
        ],
        levels: [
          {
            level: 0,
            color: '#DEDDCF',
            dataLabels: {
              color: 'black',
            },
          },
          {
            level: 1,
            color: '#DEDDCF',
            dataLabels: {
              color: 'black',
            },
            // height: 10,
          },
          {
            level: 2,
            color: '#DEDDCF',
            dataLabels: {
              color: 'black',
            },
          },
          {
            level: 3,
            dataLabels: {
              color: 'black',
            },
          },
        ],
        nodes: [
          {
            id: 'Carnivora',
            title: null,
            name: 'Carnivora',
          },
          {
            id: 'Felidae',
            title: null,
            name: 'Felidae',
            color: '#fcc657',
          },
          {
            id: 'Panthera',
            title: null,
            name: 'Panthera',
            color: '#fcc657',
          },
          {
            id: 'Panthera pardus',
            title: null,
            name: 'Panthera pardus',
            color: '#fcc657',
          },
          {
            id: 'Mustelidae',
            title: null,
            name: 'Mustelidae',
            color: '#C4B1A0',
          },
          {
            id: 'Taxidea',
            title: null,
            name: 'Taxidea',
            color: '#C4B1A0',
          },
          {
            id: 'Lutra',
            color: '#C4B1A0',
            custom: {
              info: 'Lutra',
            },
          },
          {
            id: 'Taxidea taxus',
            name: 'Taxidea taxus',
            color: '#C4B1A0',
          },
          {
            id: 'Lutra lutra',
            name: 'Lutra lutra',
            color: '#C4B1A0',
          },
          {
            id: 'Canidae',
            name: 'Canidae',
            color: '#B0ACA2',
          },
          {
            id: 'Canis',
            name: 'Canis',
            color: '#B0ACA2',
          },
          {
            id: 'Canis latrans',
            name: 'Canis latrans',
            color: '#B0ACA2',
          },
          {
            id: 'Canis lupus',
            name: 'Canis lupus',
            color: '#B0ACA2',
          },
        ],
        colorByPoint: false,
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
    tooltip: {
      outside: true,
    },
  };

  return (
    <div style={{ maxWidth: '480px', height: '100%', overflow: 'hidden' }}>
    <HighchartsReact highcharts={Highcharts} options={options} />
  </div>
  );
};

export default RulesHighcharts;

// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Geom, Guide } from 'bizcharts';
import autoHeight from '../autoHeight';

const { Text } = Guide;

const data = [{
    gender: 'male',
    value: 50,
}];

const scale = {
    value: {
        min: 0,
        max: 100,
    },
};

class TestChart extends React.Component {
    render() {
        return (
            <Chart height={150} data={data} padding={[0, 0, 0, 0]} scale={scale} forceFit>
                <h1 style={{ textAlign: 'left', color: '#CBCBCB' }}>110022</h1>
                <Geom
                    type="interval"
                    position="gender*value"
                    color="#3580EB"
                    shape="liquid-fill-gauge"
                    style={{
                        lineWidth: 2,
                        fillOpacity: 0.2,
                    }}
                />
                <Guide>
                    {
                        data.map(
                            row => (<Text
                                content={`${row.value}%`}
                                top
                                position={{
                                    gender: row.gender,
                                    value: 50,
                                }}
                                style={{
                                    opacity: 0.8,
                                    fontSize: window.innerWidth / 60,
                                    fill: '#262626',
                                    textAlign: 'center',
                                }}
                            />))
                    }
                </Guide>
            </Chart>
        );
    }
}

// CDN END
export default autoHeight()(TestChart);

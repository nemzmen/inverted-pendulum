import React, { Component } from 'react';
import {Button} from '@material-ui/core';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import ChartComponent from '../components/ChartComponent';


const data = [
  {step: 0, value: 0.1},
  {step: 1, value: 0.7},
  {step: 2, value: 0.5},
  {step: 3, value: 0.3},
  {step: 4, value: 0.2},
  {step: 5, value: 0.1},
  {step: 6, value: 0.0},
  {step: 7, value: 0.0},
  {step: 8, value: 0.0},
  {step: 9, value: 0.8},
  {step: 10, value: 0.9},
  {step: 11, value: 1.9},
  {step: 12, value: 1.4},
  {step: 13, value: 0.9},
]

const noiseTypeCurrencies = [
  {
    value: 'white_noise',
    label: 'Biały szum',
  },
  {
    value: 'pareto_signal',
    label: 'Sygnał Pareto',
  },
];


export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeValue: props.sizeValue,
      meanValue: props.meanValue,
      varianceValue: props.varianceValue,
      noiseTypeValue: props.noiseTypeValue,
    }
  }

  onChangeSizeField = ({target}) => {
    this.setState({sizeValue: target.value});
  }

  onChangeMeanField = ({target}) => {
    this.setState({meanValue: target.value});
  }

  onChangeVarianceField = ({target}) => {
    this.setState({varianceValue: target.value});
  }

  onChangeNoiseTypeField = ({target}) => {
    this.setState({noiseTypeValue: target.value});
  }

  onClickGenerateButton = () => {
    console.log('generate');
  }

  onClickResetButton = () => {
    this.setState({
      sizeValue: this.props.sizeValue,
      meanValue: this.props.meanValue,
      varianceValue: this.props.varianceValue,
      noiseTypeValue: this.props.noiseTypeValue,
    });
  }

  render() {
    return (
      <div className='main-container'>
        <div className='center padding-12 white'>
          <div className='padding-12'>
            <ChartComponent data={data} width={900} height={350} />
          </div>
          <div className='buttons-container padding-12'>
            <InputField
              label='Długość tabeli danych'
              placeholder='Zakres wartości 0-10000'
              value={this.state.sizeValue}
              onChange={this.onChangeSizeField}
            />
            <InputField
              label='Wartość średnia'
              placeholder='Zakres wartości -10-10'
              value={this.state.meanValue}
              onChange={this.onChangeMeanField}
            />
            <InputField
              label='Wariancja'
              placeholder='Zakres wartości 0-10'
              value={this.state.varianceValue}
              onChange={this.onChangeVarianceField}
            />
            <SelectField
              label='Typ szumu'
              value={this.state.noiseTypeValue}
              currencies={noiseTypeCurrencies}
              onChange={this.onChangeNoiseTypeField}
            />
          </div>
        </div>
        <div className='center padding-12'>
          <div className='padding-12'>
            <Button
              variant='contained'
              size='large'
              color='primary'
              onClick={this.onClickGenerateButton}>
              Wygeneruj sygnał szumu
            </Button>
          </div>
          <div className='padding-12'>
            <Button
              variant='contained'
              size='large'
              color='secondary'
              onClick={this.onClickResetButton}>
              Resetuj ustawienia
            </Button>
          </div>
        </div>
      </div>
    );
  }

  static defaultProps = {
    sizeValue: '1000',
    meanValue: '0.0',
    varianceValue: '1.0',
    noiseTypeValue: noiseTypeCurrencies[0].value,
  }
}

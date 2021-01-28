import React, { Component } from 'react';
import {Button} from '@material-ui/core';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import AlertComponent from '../components/AlertComponent';
import ChartComponent from '../components/ChartComponent';
import {getNoiseSignal} from '../api/endpoints';
import {noiseTypes} from '../../static/dictionaries';


const defaultChartData = [
  {step: 0, value: 0},
  {step: 1, value: 0},
  {step: 2, value: 0},
  {step: 3, value: 0},
  {step: 4, value: 0},
  {step: 5, value: 0},
  {step: 6, value: 0},
  {step: 7, value: 0},
  {step: 8, value: 0},
  {step: 9, value: 0},
  {step: 10, value: 0},
  {step: 11, value: 0},
  {step: 12, value: 0},
  {step: 13, value: 0},
  {step: 14, value: 0},
  {step: 15, value: 0},
  {step: 16, value: 0},
  {step: 17, value: 0},
  {step: 18, value: 0},
  {step: 19, value: 0},
]

const noiseTypeCurrencies = [
  {
    value: noiseTypes.normal,
    label: 'Biały szum',
  },
  {
    value: noiseTypes.pareto,
    label: 'Sygnał Pareto',
  },
  {
    value: noiseTypes.sum,
    label: 'Suma sygnałów',
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
      alertVisible: props.alertVisible,
      chartData: props.chartData,
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

  onClickGenerateButton = async () => {
    const response = await getNoiseSignal({
      size: this.state.sizeValue,
      mean: this.state.meanValue,
      variance: this.state.varianceValue,
      noiseType: this.state.noiseTypeValue,
    });
    if (response.data && response.data.array && response.data.array.signal) {
      this.setState({chartData: response.data.array.signal});
    } else {
      this.setState({alertVisible: true});
      setTimeout(this.hideErrorAlert, 3000)
    }
  }

  onClickResetButton = () => {
    this.setState({
      sizeValue: this.props.sizeValue,
      meanValue: this.props.meanValue,
      varianceValue: this.props.varianceValue,
      noiseTypeValue: this.props.noiseTypeValue,
    });
  }

  hideErrorAlert = () => {
    this.setState({alertVisible: false});
  }

  render() {
    return (
      <div className='main-container'>
        {this.state.alertVisible && (
          <AlertComponent
            severity='warning'
            title='Błąd'
            description='Wprowadzono niepoprawne dane - '
            strongDescription='sprawdź typy zmiennych!'
          />
        )}
        <div className='center padding-12 white'>
          <div className='padding-12'>
            <ChartComponent data={this.state.chartData} width={900} height={350} />
          </div>
          <div className='buttons-container padding-12'>
            <InputField
              label='Długość tabeli danych'
              placeholder='Zakres wartości 0-10000'
              value={this.state.sizeValue}
              onChange={this.onChangeSizeField}
            />
            <InputField
              label='Wartość bazowa'
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
    alertVisible: false,
    chartData: defaultChartData,
  }
}

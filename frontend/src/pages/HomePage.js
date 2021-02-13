import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import { noiseTypes } from '../../static/dictionaries';
import { getSimulationData } from '../api/endpoints';
import AlertComponent from '../components/AlertComponent';
import ChartComponent from '../components/ChartComponent';
import SelectField from '../components/SelectField';

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
      TimeValue: props.TimeValue,
      SampleTimeValue: props.SampleTimeValue,
      MassValue: props.MassValue,
      LengthValue: props.LengthValue,
      timeout: props.timeout,
      FrictionValue: props.FrictionValue,
      P_PValue: props.P_PValue,
      PID_PValue: props.PID_PValue,
      PID_IValue: props.PID_IValue,
      PID_DValue: props.PID_DValue,
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

  onChangeTimeField = ({target}) => {
    this.setState({TimeValue: target.value});
  }

  onChangeSampleTimeField = ({target}) => {
    this.setState({SampleTimeValue: target.value});
  }

  onChangeMassField = ({target}) => {
    this.setState({MassValue: target.value});
  }

  onChangeLengthField = ({target}) => {
    this.setState({LengthValue: target.value});
  }

  onChangeMomentField = ({target}) => {
    this.setState({timeout: target.value});
  }

  onChangeFrictionField = ({target}) => {
    this.setState({FrictionValue: target.value});
  }

  onChangeP_PField = ({target}) => {
    this.setState({P_PValue: target.value});
  }

  onChangePID_PField = ({target}) => {
    this.setState({PID_PValue: target.value});
  }

  onChangePID_IField = ({target}) => {
    this.setState({PID_IValue: target.value});
  }

  onChangePID_DField = ({target}) => {
    this.setState({PID_DValue: target.value});
  }

  onClickGenerateButton = async () => {
    const response = await getSimulationData({
      simulation_time: this.state.TimeValue,
      sampling_time: this.state.SampleTimeValue,
      timeout: this.state.timeout,
      pendulum_mass: this.state.MassValue,
      pendulum_length: this.state.LengthValue,
      pendulum_friction: this.state.FrictionValue,
      p_value_of_p_controller: this.state.P_PValue,
      p_value_of_pid_controller: this.state.PID_PValue,
      i_value_of_pid_controller: this.state.PID_IValue,
      d_value_of_pid_controller: this.state.PID_DValue,
    });
    if (
      response.data &&
      response.data.array &&
      response.data.array.sampling_time &&
      response.data.array.proportional &&
      response.data.array.pid &&
      response.data.array.fuzzy &&
      response.data.array.proportional.signal &&
      response.data.array.pid.signal &&
      response.data.array.fuzzy.signal
    ) {
      const chartData = [];
      const samplingTime = response.data.array.sampling_time;
      const proportionalSignal = response.data.array.proportional.signal;
      const pidSignal = response.data.array.pid.signal;
      const fuzzySignal = response.data.array.fuzzy.signal;

      for (let i = 0; i < proportionalSignal.length; i++) {
        chartData.push({
          step: i * samplingTime + samplingTime,
          proportional: proportionalSignal[i],
          pid: pidSignal[i],
          fuzzy: fuzzySignal[i],
        })
      }
      this.setState({chartData});
    } else {
      this.setState({alertVisible: true});
      setTimeout(this.hideErrorAlert, 4000)
    }
  }

  onClickNoiseResetButton = () => {
    this.setState({
      sizeValue: this.props.sizeValue,
      meanValue: this.props.meanValue,
      varianceValue: this.props.varianceValue,
      noiseTypeValue: this.props.noiseTypeValue,
    });
  }

  onClickResetButton = () => {
    this.setState({
      TimeValue: this.props.TimeValue,
      MassValue: this.props.MassValue,
      LengthValue: this.props.LengthValue,
      SampleTimeValue: this.props.SampleTimeValue,
      timeout: this.props.timeout,
      FrictionValue: this.props.FrictionValue,
      P_PValue: this.props.P_PValue,
      PID_PValue: this.props.PID_PValue,
      PID_IValue: this.props.PID_IValue,
      PID_DValue: this.props.PID_DValue,
    });
  }

  hideErrorAlert = () => {
    this.setState({alertVisible: false});
  }



  render() {
    return (
      <div className='main-container' >
      <div className='center padding-12 ' >
        <div style={{color: "black", fontSize: 50}}>
        <Card>
          <CardContent>
              Symulacja sterowania wahadłem odwróconym

          </CardContent>
        </Card>
        </div>
      </div>
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
          <div className='center'>
          <h2>Odpowiedź obiektów</h2>
          </div>
            <ChartComponent data={this.state.chartData} width={800} height={250} />
           <div className='center padding-12'>
            <img src="http://assets.stickpng.com/images/58afdad6829958a978a4a693.png" width="18" height="18">
            </img>
             Regulator P &emsp;
            <img src="https://smallimg.pngkey.com/png/small/24-249104_blue-dot-clip-art-at-clker-sky-blue.png" width="18" height="18">
            </img>
             Regulator PID &emsp;
            <img src="https://cdn.shopify.com/s/files/1/0050/6793/1718/products/Basic_green_dot_300x300.png?v=1590010493" width="25" height="25">
            </img>
             Fuzzy
            </div>

           <div className='center'>
             <h2>Sygnał szumu</h2>
           </div>
            <ChartComponent data={this.state.chartData} width={800} height={250} />
            <div className='center padding-12'>
            <div className="padding-space">
            <Button
              variant='contained'
              size='large'
              color='primary'
              onClick={this.onClickGenerateButton}>
              Symuluj
            </Button>
            </div>
            <Button
              variant='contained'
              size='large'
              color='secondary'
              onClick={this.onClickResetButton}>
              Resetuj
            </Button>
          </div>

          <div className='center padding-12 ' >
                <h2>Parametry jakości sterowania</h2>
          </div>


          <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Parametr</TableCell>
                    <TableCell>P</TableCell>
                    <TableCell>PID</TableCell>
                    <TableCell>Fuzzy</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>

                    <TableRow>
                      <TableCell>Całka z wartości bezwzględnej uchybu</TableCell>
                      <TableCell>{this.state.SampleTimeValue}</TableCell>
                      <TableCell>{this.state.TimeValue}</TableCell>
                      <TableCell>{this.state.timeout}</TableCell>

                    </TableRow>

                    <TableRow>
                      <TableCell>Minimum energii</TableCell>
                      <TableCell>{this.state.LengthValue}</TableCell>
                      <TableCell>{this.state.SampleTimeValue}</TableCell>
                      <TableCell>{this.state.P_PValue}</TableCell>

                    </TableRow>

                </TableBody>
              </Table>
            </TableContainer>
          </div>



          <div className='buttons-container padding-12'>
          <div className='center padding-x'>


          <h2>Parametry symulacji</h2>

          </div>
            <TextField
              multiline
              rowsMax={3}
              variant='outlined'
              label='Czas'
              placeholder='Wpisz wartość'
              value={this.state.TimeValue}
              onChange={this.onChangeTimeField}
            />

            <TextField
              label='Czas próbkowania'
              variant='outlined'
              placeholder='Wpisz wartość'
              value={this.state.SampleTimeValue}
              onChange={this.onChangeSampleTimeField}
            />

            <TextField

              label='Opóźnienie (próbki)'
              variant='outlined'
              placeholder='Wpisz wartość'
              value={this.state.timeout}
              onChange={this.onChangeMomentField}
            />

          <div className='center padding-x'>
            <h2>Parametry obiektu sterowania</h2>
          </div>
            <TextField
              multiline
              rowsMax={3}
              variant='outlined'
              label='Masa wahadła'
              placeholder='Wpisz wartość'
              value={this.state.MassValue}
              onChange={this.onChangeMassField}
            />
         <TextField
              label='Długość wahadła'
              variant='outlined'
              placeholder='Wpisz wartość'
              value={this.state.LengthValue}
              onChange={this.onChangeLengthField}
            />
            <TextField
              label='Współczynnik tarcia'
              variant='outlined'
              placeholder='Wpisz wartość'
              value={this.state.FrictionValue}
              onChange={this.onChangeFrictionField}
            />
          <div className='center padding-x'>
           <h2>Nastawy regulatora P</h2>
          </div>
            <TextField
              label='P'
              variant='outlined'
              placeholder='Wpisz wartość'
              value={this.state.P_PValue}
              onChange={this.onChangeP_PField}
             />
           <div className='center padding-x'>
            <h2>Nastawy regulatora PID</h2>
          </div>

            <TextField
              multiline
              rowsMax={3}
              variant='outlined'
              label='P'
              placeholder='Wpisz wartość'
              value={this.state.PID_PValue}
              onChange={this.onChangePID_PField}
            />

            <TextField
              label='I'
              variant='outlined'
              placeholder='Wpisz wartość'
              value={this.state.PID_IValue}
              onChange={this.onChangePID_IField}
            />

            <TextField
              label='D'
              variant='outlined'
              placeholder='Wpisz wartość'
              value={this.state.PID_DValue}
              onChange={this.onChangePID_DField}
            />
            <div className='center padding-x'>
            <h2>Parametry szumu</h2>
           </div>

            <TextField
              multiline
              rowsMax={3}
              variant='outlined'
              label='Wartość średnia'
              placeholder='Wpisz wartość'
              value={this.state.sizeValue}
              onChange={this.onChangeSizeField}
            />

            <TextField
              label='Skala'
              variant='outlined'
              placeholder='Wpisz wartość'
              value={this.state.meanValue}
              onChange={this.onChangeMeanField}
            />

           <div className='center padding-x'>
           <h2>Typ szumu</h2>
           </div>

            <div className=' padding-select'>
            <SelectField
              label='Typ szumu'
              value={this.state.noiseTypeValue}
              currencies={noiseTypeCurrencies}
              onChange={this.onChangeNoiseTypeField}
            />

            </div>

            <div className='center padding-x'>

            <div className="padding-space">

            <Button
              variant='contained'
              size='medium'
              color='primary'
              onClick={this.onClickGenerateButton}>
              Wygeneruj sygnał szumu
            </Button>
            </div>
            <Button
              variant='contained'
              size='medium'
              color='secondary'
              onClick={this.onClickNoiseResetButton}>
              Resetuj ustawienia
            </Button>


          </div>

          </div>

        </div>

        <div className='center padding-12'>

          </div>

      </div>
    );
  }


  static defaultProps = {
    sizeValue: '1000',
    TimeValue: '40',
    SampleTimeValue: '0.05',
    MassValue: '1',
    LengthValue: '0.5',
    timeout: '0',
    FrictionValue: '0.1',
    P_PValue: '1.1',
    PID_PValue: '1',
    PID_IValue: '1',
    PID_DValue: '1',
    meanValue: '0',
    varianceValue: '1',
    noiseTypeValue: noiseTypeCurrencies[0].value,
    alertVisible: false,
    chartData: defaultChartData,
  }

}

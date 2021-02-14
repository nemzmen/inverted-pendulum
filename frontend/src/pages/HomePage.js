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
import { getNoiseData, getSimulationData } from '../api/endpoints';
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
    value: noiseTypes.sin,
    label: 'Sygnał sinus',
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
      TimeValue: props.TimeValue,
      SampleTimeValue: props.SampleTimeValue,
      MassValue: props.MassValue,
      LengthValue: props.LengthValue,
      Timeout: props.Timeout,
      FrictionValue: props.FrictionValue,
      MaxMomentValue: props.MaxMomentValue,
      
      P_PValue: props.P_PValue,
      PID_PValue: props.PID_PValue,
      PID_IValue: props.PID_IValue,
      PID_DValue: props.PID_DValue,

      meanValue: props.meanValue,
      varianceValue: props.varianceValue,
      noiseTypeValue: props.noiseTypeValue,

      alertVisible: props.alertVisible,
      pendulumChartData: props.pendulumChartData,
      noiseChartData: props.noiseChartData,

      p_error_abs: props.p_error_abs,
      p_error_square: props.p_error_square,
      p_control_abs: props.p_control_abs,
      p_control_square: props.p_control_square,

      pid_error_abs: props.pid_error_abs,
      pid_error_square: props.pid_error_square,
      pid_control_abs: props.pid_control_abs,
      pid_control_square: props.pid_control_square,

      fuzzy_error_abs: props.fuzzy_error_abs,
      fuzzy_error_square: props.fuzzy_error_square,
      fuzzy_control_abs: props.fuzzy_control_abs,
      fuzzy_control_square: props.fuzzy_control_square,

      fuzzyErrorMin: props.fuzzyErrorMin,
      fuzzyDerivativeMin: props.fuzzyDerivativeMin,
      fuzzyControlMin: props.fuzzyControlMin,
      fuzzyErrorMax: props.fuzzyErrorMax,
      fuzzyDerivativeMax: props.fuzzyDerivativeMax,
      fuzzyControlMax: props.fuzzyControlMax,
    }
  }

  onChangeFuzzyErrorMin = ({target}) => {
    this.setState({fuzzyErrorMin: target.value});
  }

  onChangeFuzzyDerivativeMin = ({target}) => {
    this.setState({fuzzyDerivativeMin: target.value});
  }

  onChangeFuzzyControlMin = ({target}) => {
    this.setState({fuzzyControlMin: target.value});
  }

  onChangeFuzzyErrorMax = ({target}) => {
    this.setState({fuzzyErrorMax: target.value});
  }

  onChangeFuzzyDerivativeMax = ({target}) => {
    this.setState({fuzzyDerivativeMax: target.value});
  }

  onChangeFuzzyControlMax = ({target}) => {
    this.setState({fuzzyControlMax: target.value});
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
    this.setState({Timeout: target.value});
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

  onChangeMaxMomentField = ({target}) => {
    this.setState({MaxMomentValue: target.value});
  }

  onClickGenerateButton = async () => {
    const response = await getSimulationData({
      simulation_time: this.state.TimeValue,
      sampling_time: this.state.SampleTimeValue,
      timeout: this.state.Timeout,
      pendulum_mass: this.state.MassValue,
      pendulum_length: this.state.LengthValue,
      pendulum_friction: this.state.FrictionValue,
      max_moment: this.state.MaxMomentValue,
      p_value_of_p_controller: this.state.P_PValue,
      p_value_of_pid_controller: this.state.PID_PValue,
      i_value_of_pid_controller: this.state.PID_IValue,
      d_value_of_pid_controller: this.state.PID_DValue,
      fuzzy_error_min: this.state.fuzzyErrorMin,
      fuzzy_derivative_min: this.state.fuzzyDerivativeMin,
      fuzzy_control_min: this.state.fuzzyControlMin,
      fuzzy_error_max: this.state.fuzzyErrorMax,
      fuzzy_derivative_max: this.state.fuzzyDerivativeMax,
      fuzzy_control_max: this.state.fuzzyControlMax,
    });
    if (
      response.data &&
      response.data.array &&
      response.data.array.proportional &&
      response.data.array.pid &&
      response.data.array.fuzzy &&
      response.data.array.proportional.signal &&
      response.data.array.pid.signal &&
      response.data.array.fuzzy.signal
    ) {
      const pendulumChartData = [];
      const samplingTime = response.data.array.sampling_time;
      const proportional = response.data.array.proportional;
      const pid = response.data.array.pid;
      const fuzzy = response.data.array.fuzzy;

      for (let i = 0; i < proportional.signal.length; i++) {
        pendulumChartData.push({
          step: i * samplingTime + samplingTime,
          fuzzy: fuzzy.signal[i],
          pid: pid.signal[i],
          proportional: proportional.signal[i],
        })
      }
      this.setState({
        pendulumChartData,
        p_error_abs: proportional.error_abs.toFixed(2),
        p_error_square: proportional.error_square.toFixed(2),
        p_control_abs: proportional.control_abs.toFixed(2),
        p_control_square: proportional.control_square.toFixed(2),
        pid_error_abs: pid.error_abs.toFixed(2),
        pid_error_square: pid.error_square.toFixed(2),
        pid_control_abs: pid.control_abs.toFixed(2),
        pid_control_square: pid.control_square.toFixed(2),
        fuzzy_error_abs: fuzzy.error_abs.toFixed(2),
        fuzzy_error_square: fuzzy.error_square.toFixed(2),
        fuzzy_control_abs: fuzzy.control_abs.toFixed(2),
        fuzzy_control_square: fuzzy.control_square.toFixed(2),
      });
    } else {
      this.setState({alertVisible: true});
      setTimeout(this.hideErrorAlert, 4000)
    }
  }

  onClickGenerateNoiseButton = async () => {
    const response = await getNoiseData({
      simulation_time: this.state.TimeValue,
      sampling_time: this.state.SampleTimeValue,
      mean: this.state.meanValue,
      variance: this.state.varianceValue,
      noise_type: this.state.noiseTypeValue,
    });
    if (response.data && response.data.array && response.data.array.signal) {
      const samplingTime = response.data.sampling_time;
      const signal = response.data.array.signal;
      const noiseChartData = signal.map((element, i) => ({
        step: i * samplingTime + samplingTime,
        noise: element,
      }))
      
      this.setState({noiseChartData});
    } else {
      this.setState({alertVisible: true});
      setTimeout(this.hideErrorAlert, 4000)
    }
  }

  onClickNoiseResetButton = () => {
    this.setState({
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
      Timeout: this.props.Timeout,
      FrictionValue: this.props.FrictionValue,
      P_PValue: this.props.P_PValue,
      PID_PValue: this.props.PID_PValue,
      PID_IValue: this.props.PID_IValue,
      PID_DValue: this.props.PID_DValue,
      MaxMomentValue: this.props.MaxMomentValue,
      fuzzyErrorMin: this.props.fuzzyErrorMin,
      fuzzyDerivativeMin: this.props.fuzzyDerivativeMin,
      fuzzyControlMin: this.props.fuzzyControlMin,
      fuzzyErrorMax: this.props.fuzzyErrorMax,
      fuzzyDerivativeMax: this.props.fuzzyDerivativeMax,
      fuzzyControlMax: this.props.fuzzyControlMax,
    });
  }

  hideErrorAlert = () => {
    this.setState({alertVisible: false});
  }

  render() {
    const p_error_abs_best = parseFloat(this.state.p_error_abs) === Math.min(this.state.p_error_abs, this.state.pid_error_abs, this.state.fuzzy_error_abs);
    const pid_error_abs_best = parseFloat(this.state.pid_error_abs) === Math.min(this.state.p_error_abs, this.state.pid_error_abs, this.state.fuzzy_error_abs);
    const fuzzy_error_abs_best = parseFloat(this.state.fuzzy_error_abs) === Math.min(this.state.p_error_abs, this.state.pid_error_abs, this.state.fuzzy_error_abs);

    const p_error_square_best = parseFloat(this.state.p_error_square) === Math.min(this.state.p_error_square, this.state.pid_error_square, this.state.fuzzy_error_square);
    const pid_error_square_best = parseFloat(this.state.pid_error_square) === Math.min(this.state.p_error_square, this.state.pid_error_square, this.state.fuzzy_error_square);
    const fuzzy_error_square_best = parseFloat(this.state.fuzzy_error_square) === Math.min(this.state.p_error_square, this.state.pid_error_square, this.state.fuzzy_error_square);

    const p_control_abs_best = parseFloat(this.state.p_control_abs) === Math.min(this.state.p_control_abs, this.state.pid_control_abs, this.state.fuzzy_control_abs);
    const pid_control_abs_best = parseFloat(this.state.pid_control_abs) === Math.min(this.state.p_control_abs, this.state.pid_control_abs, this.state.fuzzy_control_abs);
    const fuzzy_control_abs_best = parseFloat(this.state.fuzzy_control_abs) === Math.min(this.state.p_control_abs, this.state.pid_control_abs, this.state.fuzzy_control_abs);

    const p_control_square_best = parseFloat(this.state.p_control_square) === Math.min(this.state.p_control_square, this.state.pid_control_square, this.state.fuzzy_control_square);
    const pid_control_square_best = parseFloat(this.state.pid_control_square) === Math.min(this.state.p_control_square, this.state.pid_control_square, this.state.fuzzy_control_square);
    const fuzzy_control_square_best = parseFloat(this.state.fuzzy_control_square) === Math.min(this.state.p_control_square, this.state.pid_control_square, this.state.fuzzy_control_square);

    return (
      <div className='main-container'>
        {this.state.alertVisible && (
          <div className='alert-container'>
            <AlertComponent
              severity='error'
              title='Błąd'
              description='Wprowadzono niepoprawne dane - '
              strongDescription='sprawdź typy zmiennych!'
            />
          </div>
        )}
        <div className='center padding-12 '>
          <Card>
            <CardContent>
                <h1>Symulacja sterowania wahadłem odwróconym</h1>
            </CardContent>
          </Card>
        </div>
        <div className='center padding-12 white'>
          <div className='padding-12'>
          <div className='center'>
          <h2>Odpowiedź obiektów</h2>
          </div>
          <div className='margin-left'>
            [°]
          </div>
            <ChartComponent data={this.state.pendulumChartData} width={800} height={250} />
          <div className='margin-left-max'>
            [s]
          </div>
           <div className='center padding-12'>
            <img src="http://assets.stickpng.com/images/58afdad6829958a978a4a693.png" width="17" height="17">
            </img>
             &nbsp; Regulator P &emsp;
            <img src="https://smallimg.pngkey.com/png/small/24-249104_blue-dot-clip-art-at-clker-sky-blue.png" width="18" height="18">
            </img>
             &nbsp; Regulator PID &emsp;
            <img src="https://icon2.cleanpng.com/20180328/tsq/kisspng-circle-n-carpet-cleaning-upland-green-dot-corporat-dots-5abb905aa15890.9523326215222416266609.jpg" width='20' height='20'>
            </img>
             &nbsp; Fuzzy
            </div>

           <div className='center'>
             <h2>Sygnał szumu</h2>
           </div>
           <div className='margin-left'>
            [M]
           </div>
            <ChartComponent data={this.state.noiseChartData} width={800} height={250} />
            <div className='margin-left-max'>
            [s]
          </div>
            <div className='center padding-12'>
            <div className="padding-space">
            <Button
              variant='contained'
              size='large'
              color='primary'
              onClick={this.onClickGenerateButton}>
              Wygeneruj odpowiedzi obiektu
            </Button>
            </div>
            <div className="padding-space">
            <Button
              variant='contained'
              size='large'
              color='secondary'
              onClick={this.onClickResetButton}>
              Resetuj ustawienia symulacji
            </Button>
            </div>
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
                    <TableCell><span className={p_error_abs_best ? 'best-parametr' : 'worse-parametr'}>{this.state.p_error_abs}</span></TableCell>
                    <TableCell><span className={pid_error_abs_best ? 'best-parametr' : 'worse-parametr'}>{this.state.pid_error_abs}</span></TableCell>
                    <TableCell><span className={fuzzy_error_abs_best ? 'best-parametr' : 'worse-parametr'}>{this.state.fuzzy_error_abs}</span></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Całka z kwadratu uchybu</TableCell>
                    <TableCell><span className={p_error_square_best ? 'best-parametr' : 'worse-parametr'}>{this.state.p_error_square}</span></TableCell>
                    <TableCell><span className={pid_error_square_best ? 'best-parametr' : 'worse-parametr'}>{this.state.pid_error_square}</span></TableCell>
                    <TableCell><span className={fuzzy_error_square_best ? 'best-parametr' : 'worse-parametr'}>{this.state.fuzzy_error_square}</span></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Całka z wartości bezwzględnej sygnału starującego</TableCell>
                    <TableCell><span className={p_control_abs_best ? 'best-parametr' : 'worse-parametr'}>{this.state.p_control_abs}</span></TableCell>
                    <TableCell><span className={pid_control_abs_best ? 'best-parametr' : 'worse-parametr'}>{this.state.pid_control_abs}</span></TableCell>
                    <TableCell><span className={fuzzy_control_abs_best ? 'best-parametr' : 'worse-parametr'}>{this.state.fuzzy_control_abs}</span></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Całka z kwadratu sygnału starującego</TableCell>
                    <TableCell><span className={p_control_square_best ? 'best-parametr' : 'worse-parametr'}>{this.state.p_control_square}</span></TableCell>
                    <TableCell><span className={pid_control_square_best ? 'best-parametr' : 'worse-parametr'}>{this.state.pid_control_square}</span></TableCell>
                    <TableCell><span className={fuzzy_control_square_best ? 'best-parametr' : 'worse-parametr'}>{this.state.fuzzy_control_square}</span></TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>



          <div className='buttons-container padding-12'>
          <div className='center padding-x'>


          <h2>Parametry symulacji</h2>

          </div>

          <div className='center'>
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
              value={this.state.Timeout}
              onChange={this.onChangeMomentField}
            />
          </div>
          <div className='padding-enter'></div>
          <div className='center'>
            <TextField
              multiline
              rowsMax={3}
              variant='outlined'
              label='Moment maksymalny'
              placeholder='Wpisz wartość'
              value={this.state.MaxMomentValue}
              onChange={this.onChangeMaxMomentField}
            />
          </div>
          <div className='padding-enter'></div>
          <div className='center padding-x'>
            <h2>Parametry obiektu sterowania</h2>
          </div>
          <div className='center'>
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
            </div>
            <div className='padding-enter'>
            </div>
          <div className='center padding-x'>
           <h2>Nastawy regulatora P</h2>
          </div>
          <div className='center'>
            <TextField
              label='P'
              variant='outlined'
              placeholder='Wpisz wartość'
              value={this.state.P_PValue}
              onChange={this.onChangeP_PField}
             />
            </div>
            <div className='padding-enter'></div>
            <div className='center padding-x'>
              <h2>Nastawy regulatora PID</h2>
            </div>
            <div className='center'>
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
            </div>
            <div className='padding-enter'></div>
            <div className='center padding-x'>
              <h2>Nastawy regulatora Fuzzy</h2>
            </div>
            <div className='center'>
            <TextField
              variant='outlined'
              label='Uchyb minimalny'
              placeholder='Wpisz wartość'
              value={this.state.fuzzyErrorMin}
              onChange={this.onChangeFuzzyErrorMin}
            />
            <TextField
              label='Pochodna uchybu minimalna'
              variant='outlined'
              placeholder='Wpisz wartość'
              value={this.state.fuzzyDerivativeMin}
              onChange={this.onChangeFuzzyDerivativeMin}
            />
            <TextField
              label='Sygnał sterujący minimalny'
              variant='outlined'
              placeholder='Wpisz wartość'
              value={this.state.fuzzyControlMin}
              onChange={this.onChangeFuzzyControlMin}
            />
            </div>
            <div className='padding-enter'></div>
            <div className='center'>
            <TextField
              variant='outlined'
              label='Uchyb maksymalny'
              placeholder='Wpisz wartość'
              value={this.state.fuzzyErrorMax}
              onChange={this.onChangeFuzzyErrorMax}
            />
            <TextField
              label='Pochodna uchybu maksymalna'
              variant='outlined'
              placeholder='Wpisz wartość'
              value={this.state.fuzzyDerivativeMax}
              onChange={this.onChangeFuzzyDerivativeMax}
            />
            <TextField
              label='Sygnał sterujący maksymalny'
              variant='outlined'
              placeholder='Wpisz wartość'
              value={this.state.fuzzyControlMax}
              onChange={this.onChangeFuzzyControlMax}
            />
            </div>
            <div className='padding-enter'>
            </div>
            <div className='center padding-x'>
            <h2>Parametry szumu</h2>
           </div>
            <div className='center'>

            <TextField
              multiline
              rowsMax={3}
              variant='outlined'
              label='Wartość średnia'
              placeholder='Wpisz wartość'
              value={this.state.meanValue}
              onChange={this.onChangeMeanField}
            />
            <TextField
              label='Skala'
              variant='outlined'
              placeholder='Wpisz wartość'
              value={this.state.varianceValue}
              onChange={this.onChangeVarianceField}
            />
            <SelectField
              label='Typ szumu'
              size='large'
              value={this.state.noiseTypeValue}
              currencies={noiseTypeCurrencies}
              onChange={this.onChangeNoiseTypeField}
            />
            </div>
            <div className='padding-enter'>
            </div>
            <div className='center padding-x'>
            <div className="padding-space">

            <Button
              variant='contained'
              size='large'
              color='primary'
              onClick={this.onClickGenerateNoiseButton}>
              Wygeneruj sygnał szumu
            </Button>
            </div>
            <div className="padding-space">
            <Button
              variant='contained'
              size='large'
              color='secondary'
              onClick={this.onClickNoiseResetButton}>
              Resetuj ustawienia szumu
            </Button>
            </div>
          </div>
          </div>
        </div>
        <div className='center padding-12'>
          </div>
      </div>
    );
  }


  static defaultProps = {
    TimeValue: '50',
    SampleTimeValue: '0.05',
    MassValue: '0.2',
    LengthValue: '0.6',
    Timeout: '2',
    FrictionValue: '0.05',
    MaxMomentValue: '0.3',
    P_PValue: '1.1',
    PID_PValue: '1.3',
    PID_IValue: '0.001',
    PID_DValue: '0.11',
    meanValue: '0',
    varianceValue: '0.05',
    noiseTypeValue: noiseTypeCurrencies[1].value,
    alertVisible: false,
    noiseChartData: defaultChartData,
    pendulumChartData: defaultChartData,
    p_error_abs: '0',
    p_error_square: '0',
    p_control_abs: '0',
    p_control_square: '0',
    pid_error_abs: '0',
    pid_error_square: '0',
    pid_control_abs: '0',
    pid_control_square: '0',
    fuzzy_error_abs: '0',
    fuzzy_error_square: '0',
    fuzzy_control_abs: '0',
    fuzzy_control_square: '0',
    fuzzyErrorMin: '-0.15',
    fuzzyDerivativeMin: '-0.5',
    fuzzyControlMin: '-0.1',
    fuzzyErrorMax: '0.15',
    fuzzyDerivativeMax: '0.5',
    fuzzyControlMax: '0.1',
  }
}

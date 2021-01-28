import urls from './urls';
import methods from './methods';
import headers from './headers';


export const getNoiseSignal = async ({size, mean, variance, noiseType}) => {
  const url = urls.host + urls.noise;
  const requestOptions = {
    method: methods.post,
    headers: headers.default,
    body: JSON.stringify({size, mean, variance, noise_type: noiseType})
  }

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const data = await response.json();
    return {data};
    
  } catch (error) {
    return {error};
  }
}
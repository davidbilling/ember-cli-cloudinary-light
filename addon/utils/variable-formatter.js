export default function variableFormatter(options) {
  let variables = [];

  if(!options){
    return '';
  }

  if(options.height){
    variables.push('h_' + options.height);
  }
  if(options.dpr){
    variables.push('dpr_' + options.dpr);
  }  
  if(options.width){
    variables.push('w_' + options.width);
  }
  if(options.crop){
    variables.push('c_' + options.crop);
  }
  if(options.fetch_format){
    variables.push('f_' + options.fetch_format);
  }
  if(options.quality){
    variables.push('q_' + options.quality);
  }
  if(options.radius){
    variables.push('r_' + options.radius);
  }
  if(options.default_image){
    variables.push('d_' + options.default_image);
  }

  return '/' + variables.join(",");
}

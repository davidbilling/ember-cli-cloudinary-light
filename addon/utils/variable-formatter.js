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
  if(options.aspect_ratio){
    variables.push('ar_' + options.aspect_ratio);
  }
  if(options.gravity){
    variables.push('g_' + options.gravity);
  }
  if(options.zoom){
    variables.push('z_' + options.zoom);
  }
  if(options.x){
    variables.push('x_' + options.x);
  }
  if(options.y){
    variables.push('y_' + options.y);
  }    
  if(options.angle){
    variables.push('a_' + options.angle);
  } 
  if(options.effect){
    variables.push('e_' + options.effect);
  }
  if(options.opacity){
    variables.push('o_' + options.opacity);
  }
  if(options.border){
    variables.push('bo_' + options.border);
  }
  if(options.background){
    variables.push('b_' + options.background);
  }
  if(options.overlay){
    variables.push('l_' + options.overlay);
  }
  if(options.underlay){
    variables.push('u_' + options.underlay);
  }

  return '/' + variables.join(",");
}

import { execSync, exec } from "child_process";

export function streamIt(): void {
  killIt();
  const mkchromecast = exec(
    'mkchromecast --name SHIELD --sample-rate 44100 -c wav', 
    function (error, stdout, stderr) {
      if (error) {
        console.log(error.stack);
        console.log('Error code: ' + error.code);
        console.log('Signal received: ' + error.signal);
      }
      console.log('Child Process STDOUT: ' + stdout);
      console.log('Child Process STDERR: ' + stderr);
  });
  mkchromecast.on('exit', function (code: string) {
    console.log('Child process exited with exit code ' + code);
  });
}

export async function playIt(): Promise<void> {
  const paSink = execSync('pactl list sinks short | grep Mkchromecast | awk \'{print $1}\'');
  console.log(paSink.toString());

  const pipeIt = exec(`parec -d 1 | pacat -d ${paSink}`);
  
  pipeIt.on('exit', function (code: string) {
    console.log('Child process exited with exit code ' + code);
  });
}

export function killIt(): void {
  try {
    const mkchromecastInstances = execSync('ps -a | grep mkchromecast');
    if (mkchromecastInstances){
      exec('killall mkchromecast');
    }
  } catch (error) {
    console.error(error);
  }
  
  try {
    const parecInstances = execSync('ps -a | grep parec');
    if (parecInstances){
      exec('killall parec');
    }
  } catch (error) {
    console.error(error);
  }
  
  console.log('Should be good to go boss!');
}

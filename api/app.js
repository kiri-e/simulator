import { Simulation } from '../src/simulation/simulation';
import { SimulationFailCause } from '../src/model/simulation-fail-cause.enum';
import { CrafterStats } from '../src/model/crafter-stats';
import { Craft } from '../src/model/craft';
import { MuscleMemory } from '../src/model/actions/progression/muscle-memory';
import { NameOfTheElements } from '../src/model/actions/buff/name-of-the-elements';
import { BrandOfTheElements } from '../src/model/actions/progression/brand-of-the-elements';
import { CarefulSynthesis } from '../src/model/actions/progression/careful-synthesis';
import { Groundwork } from '../src/model/actions/progression/groundwork';
import { FinalAppraisal } from '../src/model/actions/buff/final-appraisal';
import { InnerQuiet } from '../src/model/actions/buff/inner-quiet';
import { WasteNot } from '../src/model/actions/buff/waste-not';
import { WasteNotII } from '../src/model/actions/buff/waste-not-ii';
import { Manipulation } from '../src/model/actions/buff/manipulation';
import { Veneration } from '../src/model/actions/buff/veneration';
import { BasicTouch } from '../src/model/actions/quality/basic-touch';
import { PreparatoryTouch } from '../src/model/actions/quality/preparatory-touch';
import { MastersMend } from '../src/model/actions/other/masters-mend';
import { ByregotsBlessing } from '../src/model/actions/quality/byregots-blessing';
import { StepState } from '../src/model/step-state';
import { PrudentTouch } from '../src/model/actions/quality/prudent-touch';
import { Observe } from '../src/model/actions/other/observe';
import { Buff } from '../src/model/buff.enum';

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url == '/start') {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
        }).on('end', () => {
        body = Buffer.concat(body).toString();
        });
    let reqObj = JSON.parse(body);
    
    let stats = new CrafterStats(reqObj['job_id'], reqObj['craftsmanship'], reqObj['control'], reqObj['cp'], reqObj['specialist'], reqObj['level'], Array(8).fill(reqObj['level']));
    
    let craft :Craft {
      id: '3864',
      job: 14,
      rlvl: 481,
      durability: 60,
      quality: 64862,
      progress: 9181,
      lvl: 80,
      suggestedCraftsmanship: suggestedCraftsmanship || suggested[rlvl.toString()].craftsmanship || 0,
      suggestedControl: suggestedControl || suggested[rlvl.toString()].control || 1425,
      hq: 1,
      quickSynth: 1,
      ingredients: [],
      expert: 1
    };
    let sim = new Simulation(craft, [], stats);
    res.end(JSON.stringify(sim));
    
  }  else if (req.url == '/step') {
  }  else {
      res.end("Unknown command")
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


function timeout(duration = 0) {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(1), duration);
	})
}

// Chain
timeout(1000)
.then(
	(v) => {
		console.log('resolved with: ' + v);
		return timeout(2000);
	}, 
	(v) => {
		console.log('rejected with: ' + v);
		return timeout(2000);
	}
	)
.then(
	(v) => {
		console.log('resolved with: ' + v);
		throw new Error("hmm");
	}, 
	(v) => {
		console.log('rejected with: ' + v);
	}
	)
.catch(
	(err) => {
		console.log(err);
	}
	)





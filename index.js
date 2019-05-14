var discovery = require('discovery-swarm')
var hypercore = require('hypercore')
var pump = require('pump')

var feed = hypercore('sending', {
  valueEncoding: 'json'
})

const SerialPort = require('serialport')
const port = new SerialPort('/dev/ttyACM0', {
  baudRate: 115200
})

// Switches the port into "flowing mode"
port.on('data', function (data) {
  console.log('Data:', data.toString())
  feed.append({
    type: 'chat-message',
    nickname: 'sensor',
    text: data.toString(),
    timestamp: new Date().toISOString()
  })
})

feed.createReadStream({live:true})
  .on('data', function (data) {
    console.log(data.timestamp + '> ' + data.text.trim())
  })

var swarm = discovery()

feed.ready(function () {
  // we use the discovery as the topic
  swarm.join(feed.discoveryKey)
  swarm.on('connection', function (connection) {
    console.log('(New peer connected!)')
    pump(connection, feed.replicate({ live: true }), connection)
  })
  console.log('public key:', feed.key.toString('hex'))
})


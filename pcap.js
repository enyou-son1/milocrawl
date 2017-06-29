/**
 * Created by sunyanyang on 2017/6/26.
 */
var pcap = require('pcap'),
    http_session = require('http_trace'),
    tcp_tracker = new pcap.TCPTracker(),
    pcap_session = pcap.createSession('en0', "ip proto \\tcp");

tcp_tracker.on('session', function (session) {
    console.log(session);
    //console.log("Start of session between " + session.src_name + " and " + session.dst_name);
    session.on('end', function (session) {
        //console.log("End of TCP session between " + session.src_name + " and " + session.dst_name);
    });
});

pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet);
    tcp_tracker.track_packet(packet);
});
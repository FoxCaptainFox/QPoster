'use strict';

// Required for work on iOS 9
import 'babel-polyfill';

class ExampleApp extends React.Component {
    render() {

        var str =  Poster.settings.spotTabletId + "|" + Poster.settings.accountUrl;
        var url = "ws://markiz9999-001-site1.atempurl.com/ws";

        var socket = new WebSocket(url, str);
        socket.onmessage = function (event) {
            Poster.interface.showNotification({
                title: 'QPoster notification',
                message: 'Please, visit table #' + JSON.parse(event.data).tableId,
                icon: 'https://us.123rf.com/450wm/liluydesign/liluydesign1603/liluydesign160300021/55490286-vector-bell-icon-symbol-simple-black-icon-.jpg?ver=6',
            })
        };

        return <div></div>;
    }
}

ReactDOM.render(
    <ExampleApp />,
    document.getElementById('app-container')
);
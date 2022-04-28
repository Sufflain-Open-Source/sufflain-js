import swal from 'sweetalert';

export function showStylizedAlert(title, msg) {
    swal({
        title,
        text: msg,
        icon: 'info',
        button: 'Закрыть'
    });
}
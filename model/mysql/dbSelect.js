const query = {
    SELECT_room_all: 'SELECT  * FROM rooms ',
    SELECT_guest_all: 'SELECT * FROM guests ',
    SELECT:`SELECT ?? FROM ??`,
    SELECT_1guest: 'SELECT * FROM guests WHERE first_name =? AND last_name = ?',
    SELECT_reserved_all: 'SELECT reservations.reservation_id,rooms.room_number,guests.first_name,reservations.check_in_date,reservations.check_out_date,reservations.total_amount FROM reservations JOIN rooms ON reservations.room_id = rooms.room_id JOIN guests ON reservations.guest_id = guests.guest_id ;',
    SELECT_check_roombyNumber: 'SELECT * FROM rooms WHERE room_number = ?;',
    SELECT_check_availableWithDate: 'SELECT * FROM rooms JOIN reservations ON reservations.room_id=rooms.room_id WHERE rooms.room_number = ? AND ? BETWEEN reservations.check_in_date AND reservations.check_out_date;',
    SELECT_check_availableroomWithData: 'SELECT reservations.reservation_id,rooms.room_number,guests.first_name,reservations.check_in_date,reservations.check_out_date,reservations.total_amount FROM reservations JOIN rooms ON reservations.room_id = rooms.room_id JOIN guests ON reservations.guest_id = guests.guest_id WHERE rooms.room_number = ? ;',
    INSERT_reservation: 'INSERT INTO reservations (guest_id, room_id, check_in_date, check_out_date, total_amount, note) VALUES(?,?,?,?,?,?)',
    UPDATE_available:'UPDATE rooms SET is_available = 0 WHERE room_id = ?'
};
module.exports=query
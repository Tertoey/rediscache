const hotel = require('../model/mysql/dbConnect')
const select = require('../model/mysql/dbSelect')

exports.guests = (req,res)=>{
    hotel.query(select.SELECT_guest_all,(err,result)=>{
        if(err){
            return res.json({status:"err",message:'Data not found'})
        }else{
            return res.json({result:result})
        }
    })
}

exports.rooms = (req,res)=>{
    hotel.query(select.SELECT_room_all,(err,result)=>{
        if(err){
            return res.json({status:"err",message:'Data not found'})
        }else{
            return res.json({result:result})
        }
    })
}

exports.select = (req,res)=>{
    console.log(req.body.sel)
    hotel.query(select.SELECT,[req.body.sel,req.body.from],(err,result)=>{
        if(err){
            return res.status(500).json({status:"err",message:err})
        }else{
            return res.status(200).json({result:result,TotalGuest:result.length})
        }
    })
}

exports.reservedAll = (req,res)=>{
    hotel.query(select.SELECT_reserved_all,(err,result)=>{
        if(err){
            return res.json({status:"err",message:'Room available'})
        }else{
            return res.json({result:result})
        }
    })
}

exports.reservedate = (req,res)=>{
    hotel.query(select.SELECT_check_availableWithDate,[req.body.room_number,req.body.check_in_date],(err,result)=>{
        if(result.length ===0){
            return res.json({result:'Room available'})
        }else{
            return res.json({result:"reee"})
        }
    })
}

exports.reservation = (req,res)=>{
    const checkIn = new Date(req.body.check_in_date)
    hotel.query(select.SELECT_check_availableWithDate,[req.body.room_number,checkIn],(err,result)=>{
        console.log(typeof checkIn)
        if(result.length ===1) {
            return res.json({ status : 'error' , message :"Room Not Available (Date)"})
        }else{
            hotel.query(select.SELECT_check_roombyNumber,[req.body.room_number],(err,result5)=>{
                    console.log(result5.length,"555")
                    const room_id = result5[0].room_id
                    console.log(room_id)
                    hotel.query(select.SELECT_1guest,[req.body.first_name,req.body.last_name],(err,result1)=>{
                        if(result1.length<1){
                            return res.json({status:'error',message:"User not found, Please register"})
                        }else if(result1.length === 1){
                            const guest_id = result1[0].guest_id
                            console.log(guest_id)
                            hotel.query(select.INSERT_reservation,[guest_id,room_id,req.body.check_in_date, req.body.check_out_date, req.body.total_amount, req.body.note],(err,result3)=>{
                                if(result3.affectedRows === 1){
                                    console.log('Insert step Pass')
                                    return res.json({status:'Room Reserved successfull',result:result3})
                                }else {
                                    return res.json({status:'error',message:'Reservation error, Please try again'})
                                }
                            })
                        }
                    })
            })
        }
    })
}
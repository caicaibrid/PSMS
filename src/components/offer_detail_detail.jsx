/**
 * Created by sa on 17-1-10.
 */
import React from "react";
import {ajax} from "../lib/ajax";
import moment from "moment";

var OfferDetailDetail = React.createClass({
    getInitialState() {
        return {
            result:[],
            country_detail:[],
            country:"",
            date:"",
            history_header:[],
            history_body:[]
        };
    },
    history(e){
        var _this = this;
        ajax("post","/api/history",JSON.stringify({
            flag:e.target.dataset.flag,
            offer_id:_this.props.id
        })).then(function (data) {
            var data = JSON.parse(data);
            if(data.code=="200"){
                _this.setState({
                    history_header:data.result.length>0?Object.keys(data.result[0]):[],
                    history_body:data.result
                })
                $("#history_modal").modal("show");
            }else {
                $(".ajax_error").html(data.message);
                $("#modal").modal("toggle");
            }
        });
    },
    price(e){
        var _this = this;
        if(e){
            _this.setState({
                country:e.target.dataset.country
            })
        }
        ajax("post","/api/country_time_show",JSON.stringify({
            date:(_this.state.date&&moment(this.state.date).format("YYYY-MM")) || moment().format("YYYY-MM"),
            country:e?e.target.dataset.country:_this.state.country
        })).then(function (data) {
            var data = JSON.parse(data);
            if(data.code==200){
                $("#price-calendar").priceCalendar({
                    date:_this.state.date || moment()._d
                },data.result,"NoEdit");
                $(".price-calendar").show();

                $(".cal-prev").on('click',function () {
                    var year = +$(".cal-year").text();
                    var month = $(".cal-month").text() - 1;
                    if (month < 1) {
                        year -= 1;
                        month = 12;
                    }
                    var date = new Date(year, month-1,1);
                    _this.setState({date:date});
                    _this.price();
                });

                // 下一月
                $(".cal-next").on('click',function () {
                    var year = +$(".cal-year").text();
                    var month = +$(".cal-month").text() + 1;
                    if (month > 12) {
                        year += 1;
                        month = 1;
                    }
                    var date = new Date(year, month-1,1);
                    _this.setState({date:date});
                    _this.price();
                });
                $(".cal-save").on("click",function () {
                    $(".price-calendar").hide();
                });
                $(".cal-cancel").on("click",function () {
                    $(".price-calendar").hide();
                });
            }else {
                $(".ajax_error").html(data.message);
                $("#modal").modal("toggle");
            }
        });
    },
    componentDidMount(){
        var _this = this;
        ajax("get","/api/offer_detail/"+_this.props.id).then(function (data) {
            var data = JSON.parse(data);
            if(data.code=="200"){
                _this.setState({
                    result:data.result,
                    country_detail:data.result.country_detail
                })
            }else {
                $(".ajax_error").html(data.message);
                $("#modal").modal("toggle");
            }
        });
    },
    render:function () {
        var _this = this;
        return (
            <form id="create_offer" className="form-horizontal offer_detail_detail" role="form" noValidate="noValidate">
                <div id="create_offer" className="row">

                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            ID
                        </div>
                        <div className="col-sm-3" >
                            {this.props.id}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            客户名称
                        </div>
                        <div className="col-sm-3" id="khmc">
                            {this.state.result.customer_id}
                        </div>
                        <div className="col-sm-3 text-right">
                            <img src="./src/img/changeHIstory.jpg" data-flag="status" onClick={this.history} style={{width:"20px",marginRight:"10px",cursor:"pointer"}}/> Status
                        </div>
                        <div className="col-sm-3">
                            {this.state.result.status}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            <img src="./src/img/changeHIstory.jpg" data-flag="contract_type" onClick={this.history} style={{width:"20px",marginRight:"10px",cursor:"pointer"}}/> 合作方式
                        </div>
                        <div className="col-sm-3">
                            {this.state.result.contract_type}
                        </div>
                        <div className="col-sm-3 text-right">
                            比例
                        </div>
                        <div className="col-sm-3">
                            {this.state.result.contract_scale}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            合同编号
                        </div>
                        <div className="col-sm-3">
                            {this.state.result.contract_num}
                        </div>
                        <div className="col-sm-3 text-right">
                            销售
                        </div>
                        <div className="col-sm-3">
                            {this.state.result.user_id}
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <hr/>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            操作系统
                        </div>
                        <div className="col-sm-3">
                            {this.state.result.os}
                        </div>
                        <div className="col-sm-3 text-right">
                            包名
                        </div>
                        <div className="col-sm-3">
                            {this.state.result.package_name}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            APP 名称
                        </div>
                        <div className="col-sm-9">
                            {this.state.result.app_name}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            APP 类型
                        </div>
                        <div className="col-sm-9">
                            {this.state.result.app_type}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            Preview Link
                        </div>
                        <div className="col-sm-9">
                            {this.state.result.preview_link}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            Tracking Link
                        </div>
                        <div className="col-sm-9">
                            {this.state.result.track_link}
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <hr/>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            制作素材
                        </div>
                        <div className="col-sm-3">
                            {this.state.result.material}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            投放起始
                        </div>
                        <div className="col-sm-3">
                            {this.state.result.startTime}
                        </div>
                        <div className="col-sm-3 text-right">
                            投放截止
                        </div>
                        <div className="col-sm-3">
                            {this.state.result.endTime}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            投放平台
                        </div>
                        <div className="col-sm-9">
                            {this.state.result.platform}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            投放地区
                        </div>
                        <div className="col-sm-9">
                            {this.state.result.country}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            <img src="./src/img/changeHIstory.jpg" data-flag="price" onClick={this.history} style={{width:"20px",marginRight:"10px",cursor:"pointer"}}/> 投放单价
                        </div>
                        <div className="col-sm-9">
                            {this.state.result.price}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            {
                                this.state.country_detail.length>0?<img src="./src/img/changeHIstory.jpg" data-flag="country_detail" onClick={this.history} style={{width:"20px",marginRight:"10px",cursor:"pointer"}}/>:""

                            }
                        </div>
                        <div className="col-sm-9 table-responsive">
                            <table className="table table-bordered text-center" id="country_detail">
                                <tbody>
                                {
                                    this.state.country_detail.map(function (ele,index,array) {
                                        return <tr key={index}>
                                            <td>{ele.country}</td>
                                            <td>{ele.price}</td>
                                            <td><img onClick={_this.price} data-country={ele.country} className="calendar_img" style={{cursor:"pointer",width:"24px"}} src="./src/img/calender.jpg"/></td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            <img src="./src/img/changeHIstory.jpg" data-flag="daily_budget" onClick={this.history} style={{width:"20px",marginRight:"10px",cursor:"pointer"}}/> 最高日预算
                        </div>
                        <div className="col-sm-3">
                            {this.state.result.daily_type}
                        </div>
                        <div className="col-sm-3">
                            {this.state.result.daily_budget}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            <img src="./src/img/changeHIstory.jpg" data-flag="total_butget" onClick={this.history} style={{width:"20px",marginRight:"10px",cursor:"pointer"}}/> 最高总预算
                        </div>
                        <div className="col-sm-3">
                            {this.state.result.total_type}
                        </div>
                        <div className="col-sm-3">
                            {this.state.result.total_budget}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            预算分配
                        </div>
                        <div className="col-sm-9">
                            {this.state.result.distribution}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            授权账户
                        </div>
                        <div className="col-sm-9">
                            {this.state.result.authorized}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            命名规则
                        </div>
                        <div className="col-sm-9">
                            {this.state.result.named_rule}
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <hr/>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            <img src="./src/img/changeHIstory.jpg" data-flag="KPI" onClick={this.history} style={{width:"20px",marginRight:"10px",cursor:"pointer"}}/> KPI　要求
                        </div>
                        <div className="col-sm-9">
                            {this.state.result.KPI}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            结算标准
                        </div>
                        <div className="col-sm-9">
                            {this.state.result.settlement}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            账期
                        </div>
                        <div className="col-sm-9">
                            {this.state.result.period}
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <hr/>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            备注
                        </div>
                        <div className="col-sm-9">
                            {this.state.result.remark}
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <hr/>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            邮件报告
                        </div>
                        <div className="col-sm-9">
                            {this.state.result.email_time}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">

                        </div>
                        <div className="col-sm-9">
                            {this.state.result.email_users}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">
                            报告模板
                        </div>
                        <div className="col-sm-9">
                            {this.state.result.email_tempalte==1?"最全数据模板":""}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-3 text-right">

                        </div>
                        <div className="col-sm-9">
                            <a href={"#/create_offer/"+this.props.id}  className="btn btn-primary">Edit</a>
                        </div>
                    </div>
                    <div className="price-calendar">
                        <div className="mask_mask box-center">
                            <div id="price-calendar"></div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="history_modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <a type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></a>
                                <h4 className="modal-title">修改历史</h4>
                            </div>
                            <div className="modal-body table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            {
                                                this.state.history_header.map(function (ele,index,array) {
                                                    return <th key={index}>{ele}</th>
                                                })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            _this.state.history_body.map(function (ele,index,array) {
                                                return <tr key={index}>
                                                            {
                                                                _this.state.history_header.map(function (ele1,index1,array1) {
                                                                    return <td key={index1}>{ele[ele1]}</td>
                                                                })
                                                            }
                                                       </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <a  className="btn btn-default" data-dismiss="modal">Close</a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
});
export default  OfferDetailDetail;
import React from 'react';
import './PricingPage.css';

const PricingPage = () => {
  return (
    <div className="pricing-page-wrapper">
      <div className="pricing-page-container">
        <h1 className="page-title">Giá vé</h1>
        <p className="page-subtitle">(Áp dụng từ ngày 01/06/2023)</p>

        {/* === Bảng giá vé 2D === */}
        <section className="table-section">
          <h2 className="table-title">1. GIÁ VÉ XEM PHIM 2D</h2>
          <div className="pricing-table">
            <table>
              <thead>
                <tr>
                  <th rowSpan="2">
                    Thời gian
                    <br />
                    <span className="th-english">Time</span>
                  </th>
                  <th colSpan="3">
                    Từ thứ 2 đến thứ 5
                    <br />
                    <span className="th-english">From Monday to Thursday</span>
                  </th>
                  <th colSpan="3">
                    Thứ 6, 7, CN và ngày Lễ
                    <br />
                    <span className="th-english">Friday, Saturday, Sunday & public holiday</span>
                  </th>
                </tr>
                <tr>
                  <th>Ghế thường<br /><span className="th-english">Standard</span></th>
                  <th className="vip-header">Ghế VIP<br /><span className="th-english">VIP</span></th>
                  <th className="sweetbox-header">Ghế đôi<br /><span className="th-english">Sweetbox</span></th>
                  <th>Ghế thường<br /><span className="th-english">Standard</span></th>
                  <th className="vip-header">Ghế VIP<br /><span className="th-english">VIP</span></th>
                  <th className="sweetbox-header">Ghế đôi<br /><span className="th-english">Sweetbox</span></th>
                </tr>
              </thead>
              <tbody>
                {/* --- HÀNG 1: Trước 12H --- */}
                <tr data-time="Trước 12H">
                  <td>Trước 12H<br /><span className="th-english">Before 12PM</span></td>
                  <td data-label="T2-T5 Standard">55.000đ</td>
                  <td data-label="T2-T5 VIP" className="vip-price">65.000đ</td>
                  <td data-label="T2-T5 Sweetbox" className="sweetbox-price">140.000đ</td>
                  <td data-label="T6-CN Standard">70.000đ</td>
                  <td data-label="T6-CN VIP" className="vip-price">80.000đ</td>
                  <td data-label="T6-CN Sweetbox" className="sweetbox-price">170.000đ</td>
                </tr>
                {/* --- HÀNG 2: 12:00 - 17:00 --- */}
                <tr data-time="Từ 12:00 đến trước 17:00">
                  <td>Từ 12:00 đến trước 17:00<br /><span className="th-english">From 12PM to before 5PM</span></td>
                  <td data-label="T2-T5 Standard">70.000đ</td>
                  <td data-label="T2-T5 VIP" className="vip-price">75.000đ</td>
                  <td data-label="T2-T5 Sweetbox" className="sweetbox-price">160.000đ</td>
                  <td data-label="T6-CN Standard">80.000đ</td>
                  <td data-label="T6-CN VIP" className="vip-price">85.000đ</td>
                  <td data-label="T6-CN Sweetbox" className="sweetbox-price">180.000đ</td>
                </tr>
                {/* --- HÀNG 3: 17:00 - 23:00 --- */}
                <tr data-time="Từ 17:00 đến trước 23:00">
                  <td>Từ 17:00 đến trước 23:00<br /><span className="th-english">From 5PM to before 11PM</span></td>
                  <td data-label="T2-T5 Standard">80.000đ</td>
                  <td data-label="T2-T5 VIP" className="vip-price">85.000đ</td>
                  <td data-label="T2-T5 Sweetbox" className="sweetbox-price">180.000đ</td>
                  <td data-label="T6-CN Standard">90.000đ</td>
                  <td data-label="T6-CN VIP" className="vip-price">95.000đ</td>
                  <td data-label="T6-CN Sweetbox" className="sweetbox-price">200.000đ</td>
                </tr>
                {/* --- HÀNG 4: Từ 23:00 --- */}
                <tr data-time="Từ 23:00">
                  <td>Từ 23:00<br /><span className="th-english">From 11PM</span></td>
                  <td data-label="T2-T5 Standard">65.000đ</td>
                  <td data-label="T2-T5 VIP" className="vip-price">70.000đ</td>
                  <td data-label="T2-T5 Sweetbox" className="sweetbox-price">150.000đ</td>
                  <td data-label="T6-CN Standard">75.000đ</td>
                  <td data-label="T6-CN VIP" className="vip-price">80.000đ</td>
                  <td data-label="T6-CN Sweetbox" className="sweetbox-price">170.000đ</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="7">*Đối với phim có thời lượng từ 150 phút trở lên: phụ thu 10.000 VNĐ / vé</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* === Bảng giá vé 3D === */}
        <section className="table-section">
          <h2 className="table-title">2. GIÁ VÉ XEM PHIM 3D</h2>
          <div className="pricing-table">
            <table>
              <thead>
                <tr>
                  <th rowSpan="2">Thời gian<br /><span className="th-english">Time</span></th>
                  <th colSpan="3">Từ thứ 2 đến thứ 5<br /><span className="th-english">From Monday to Thursday</span></th>
                  <th colSpan="3">Thứ 6, 7, CN và ngày Lễ<br /><span className="th-english">Friday, Saturday, Sunday & public holiday</span></th>
                </tr>
                <tr>
                  <th>Ghế thường<br /><span className="th-english">Standard</span></th>
                  <th className="vip-header">Ghế VIP<br /><span className="th-english">VIP</span></th>
                  <th className="sweetbox-header">Ghế đôi<br /><span className="th-english">Sweetbox</span></th>
                  <th>Ghế thường<br /><span className="th-english">Standard</span></th>
                  <th className="vip-header">Ghế VIP<br /><span className="th-english">VIP</span></th>
                  <th className="sweetbox-header">Ghế đôi<br /><span className="th-english">Sweetbox</span></th>
                </tr>
              </thead>
              <tbody>
                {/* --- HÀNG 1: Trước 12H --- */}
                <tr data-time="Trước 12H">
                  <td>Trước 12H<br /><span className="th-english">Before 12PM</span></td>
                  <td data-label="T2-T5 Standard">60.000đ</td>
                  <td data-label="T2-T5 VIP" className="vip-price">80.000đ</td>
                  <td data-label="T2-T5 Sweetbox" className="sweetbox-price">160.000đ</td>
                  <td data-label="T6-CN Standard">80.000đ</td>
                  <td data-label="T6-CN VIP" className="vip-price">100.000đ</td>
                  <td data-label="T6-CN Sweetbox" className="sweetbox-price">200.000đ</td>
                </tr>
                {/* --- HÀNG 2: 12:00 - 17:00 --- */}
                <tr data-time="Từ 12:00 đến trước 17:00">
                  <td>Từ 12:00 đến trước 17:00<br /><span className="th-english">From 12PM to before 5PM</span></td>
                  <td data-label="T2-T5 Standard">80.000đ</td>
                  <td data-label="T2-T5 VIP" className="vip-price">90.000đ</td>
                  <td data-label="T2-T5 Sweetbox" className="sweetbox-price">180.000đ</td>
                  <td data-label="T6-CN Standard">100.000đ</td>
                  <td data-label="T6-CN VIP" className="vip-price">110.000đ</td>
                  <td data-label="T6-CN Sweetbox" className="sweetbox-price">220.000đ</td>
                </tr>
                {/* --- HÀNG 3: 17:00 - 23:00 --- */}
                <tr data-time="Từ 17:00 đến trước 23:00">
                  <td>Từ 17:00 đến trước 23:00<br /><span className="th-english">From 5PM to before 11PM</span></td>
                  <td data-label="T2-T5 Standard">100.000đ</td>
                  <td data-label="T2-T5 VIP" className="vip-price">110.000đ</td>
                  <td data-label="T2-T5 Sweetbox" className="sweetbox-price">220.000đ</td>
                  <td data-label="T6-CN Standard">130.000đ</td>
                  <td data-label="T6-CN VIP" className="vip-price">140.000đ</td>
                  <td data-label="T6-CN Sweetbox" className="sweetbox-price">280.000đ</td>
                </tr>
                {/* --- HÀNG 4: Từ 23:00 --- */}
                <tr data-time="Từ 23:00">
                  <td>Từ 23:00<br /><span className="th-english">From 11PM</span></td>
                  <td data-label="T2-T5 Standard">100.000đ</td>
                  <td data-label="T2-T5 VIP" className="vip-price">110.000đ</td>
                  <td data-label="T2-T5 Sweetbox" className="sweetbox-price">220.000đ</td>
                  <td data-label="T6-CN Standard">120.000đ</td>
                  <td data-label="T6-CN VIP" className="vip-price">130.000đ</td>
                  <td data-label="T6-CN Sweetbox" className="sweetbox-price">260.000đ</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="7">*Đối với phim có thời lượng từ 150 phút trở lên: phụ thu 10.000 VNĐ / vé</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        <section className="notes-section">
                     <div className="notes-block">
            <h3>* Giá vé đối với các đối tượng khán giả ưu tiên (khi trực tiếp sử dụng dịch vụ xem phim tại rạp chiếu phim):</h3>
            <ul>
              <li>Giảm 20% giá vé theo qui định đối với: Trẻ em (người dưới 16 tuổi), người cao tuổi (công dân Việt Nam từ đủ 60 tuổi trở lên), người có công với cách mạng, người có hoàn cảnh đặc biệt khó khăn.</li>
              <li>Giảm 50% giá vé theo qui định đối với: Người khuyết tật nặng.</li>
              <li>Giảm giá vé 100% đối với: Người khuyết tật đặc biệt nặng, trẻ em dưới 0,7m đi kèm với người lớn.</li>
            </ul>
          </div>
          
          <div className="notes-block">
            <h3>Điều kiện:</h3>
            <ul>
              <li>Chỉ áp dụng khi mua vé tại quầy (không áp dụng khi mua online).</li>
              <li>Các đối tượng khán giả trên phải xuất trình giấy tờ chứng minh khi mua vé xem phim và trước khi vào phòng chiếu. Cụ thể:</li>
              <li>Trẻ em (trường hợp trẻ em từ 14-16 tuổi), người cao tuổi: xuất trình “Căn cước công dân”.</li>
              <li> Người có công với cách mạng: xuất trình giấy xác nhận theo quy định.</li>
              <li> Người có hoàn cảnh đặc biệt khó khăn: xuất trình “Giấy chứng nhận hộ nghèo”.</li>
              <li> Người khuyết tật: xuất trình “Giấy xác nhận khuyết tật”.</li>
            </ul>
          </div>

          <div className="notes-block">
            <h3>* Ưu đãi cho học sinh, sinh viên từ 22 tuổi trở xuống: Đồng giá 55.000đ /vé 2D cho tất cả các suất chiếu phim từ Thứ 2 đến Thứ 6 (chỉ áp dụng cho hình thức mua vé trực tiếp tại quầy, không áp dụng vé ghế đôi; Mỗi thẻ được mua 1 vé/ngày và vui lòng xuất trình thẻ U22 kèm thẻ HSSV khi mua vé)</h3>
          </div>

          <div className="notes-block">
            <h3>* Khán giả nghiêm túc thực hiện xem phim đúng độ tuổi theo phân loại phim: P, K, T13, T16, T18, C. (Trường hợp vi phạm sẽ xử phạt theo Quy định tại Nghị định 128/2022/NĐ-CP ngày 30/12/2022).</h3>
          </div>

          <div className="notes-block">
            <h3>* Không bán vé cho trẻ em dưới 13 tuổi đối với các suất chiếu phim kết thúc sau 22H00 và không bán vé cho trẻ em dưới 16 tuổi đối với các suất chiếu phim kết thúc sau 23H00.</h3>
          </div>
          
          <div className="notes-block">
            <h3>* Áp dụng giá vé ngày Lễ, Tết cho các ngày:</h3>
            <ul>
                <li>Các ngày nghỉ Lễ, Tết theo quy định của nhà nước: Tết Nguyên Đán, Tết Dương Lịch, ngày Giỗ Tổ Hùng Vương 10/3 AL, ngày 30/4, 1/5, 2/9.</li>
                <li>Các ngày: 14/2, 8/3, 24/12.</li>
                <li>Các ngày: Nghỉ bù do nghỉ Lễ, Tết trùng vào thứ 7, Chủ Nhật.</li>
            </ul>
          </div>

          <div className="notes-block">
            <h3>* Không áp dụng các chế độ ưu đãi, các chương trình khuyến mại khác vào các ngày 20/10, 20/11, Halloween 31/10, các ngày Lễ, Tết, suất chiếu sớm và suất chiếu đặc biệt.</h3>
          </div>

          <div className="notes-block">
            <h3>* Mua vé xem phim tập thể, hợp đồng khoán gọn: Phòng chiếu phim - (024) 35148647.</h3>
          </div>

          <div className="notes-block">
            <h3>* Thuê phòng tổ chức Hội nghị, làm văn phòng, quảng cáo và các dịch vụ khác: Phòng Dịch vụ - (024) 35142856</h3>
          </div>

          <div className="notes-block">
            <h3>ĐỀ NGHỊ QUÝ KHÁN GIẢ LƯU Ý KHI MUA VÉ XEM PHIM (ĐẶC BIỆT KHI MUA VÉ ONLINE). TTCPQG KHÔNG CHẤP NHẬN HOÀN TIỀN HOẶC ĐỔI VÉ ĐÃ THANH TOÁN THÀNH CÔNG KHI MUA VÉ ONLINE VÀ VÉ MUA SAI QUY ĐỊNH TẠI QUẦY VÉ.</h3>
            <p>Rất mong Quý khán giả phối hợp thực hiện.</p>
            <p>Xin trân trọng cảm ơn!</p>
          </div>

          {/* --- Phần Tiếng Anh --- */}
          <div className="notes-block">
            <h3>* Ticket pricing policy for priority audiences watching movies at the cinema:</h3>
            <ul>
              <li>Discount 20% on ticket price for: Children and teenagers (under 16 years old), elderly people (Vietnamese citizens aged from 60 years old), revolutionary contributors, people with difficult living conditions.</li>
              <li>Discount 50% on ticket price as regulations for: People with severe disabilities.</li>
              <li>Discount 100% on ticket price for: People with particularly severe disabilities; Children under 0.7m accompanied by adults.</li>
            </ul>
          </div>
          <div className="notes-block">
            <h3>Condition:</h3>
            <ul>
              <li>Only applicable when buying tickets at the counter (not applicable for online tickets).</li>
              <li>The above-mentioned audiences must present Identification Documents when buying movie tickets and before entering the screening room. Particularly:</li>
              <li>Teenagers (14-16 years old), elderly people: must present “ID card”.</li>
              <li>Revolutionary contributors: must present a certificate as prescribed.</li>
              <li>People with difficult living conditions: must present “Certificate of Poor Household”.</li>
              <li>People with disabilities: must present “Certificate of Disability”.</li>
            </ul>
          </div>
          <div className="notes-block">
            <h3>* Special promotion for student who is 22 years old and under: From Monday to Friday 55.000đ/2D ticket for all slot times (only apply for direct purchase at the ticket stall, one student card can buy one ticket/day, student should show their U22 and student cards to get this priority).</h3>
          </div>
          <div className="notes-block">
            <h3>* Strict implementation of audience classification according to their ages: P, K, T13, T16, T18, C. (Violation will be sanctioned according to the provisions of Decree 128/2022/ND-CP dated on December 30, 2022).</h3>
          </div>
          <div className="notes-block">
            <h3>* Tickets for movies ending after 22:00 are not sold to teenagers under 13 years old and tickets for movies ending after 23:00 are not sold to teenagers under 16 years old.</h3>
          </div>
          <div className="notes-block">
            <h3>* Holiday price is applied on:</h3>
            <ul>
              <li>The public holidays as prescribed by state: New year, Lunar new year, Hung’s King festival (March 10th - lunar calender), April 30th, May 1st, September 2nd.</li>
              <li>Days: Valentine, Women’s Day, Noel.</li>
              <li>Compensatory days off due to holidays coinciding with Saturday and Sunday.</li>
            </ul>
          </div>
          <div className="notes-block">
            <h3>* Do not apply preferential programs and different promotional ones in the day 20/10, 20/11, Halloween 31/10, holidays, sneak show and special show.</h3>
          </div>
          <div className="notes-block">
            <h3>VALUED AUDIENCES PLEASE TAKE INTO CONSIDERATION WHEN BUYING MOVIE TICKETS (ESPECIALLY FOR ONLINE TICKETS). THE NATIONAL CINEMA CENTER DOES NOT ACCEPT REFUNDS OR EXCHANGES OF SUCCESSFULLY PAID TICKETS (ONLINE TICKETS AND INCORRECTLY PURCHASED TICKETS AT THE COUNTER).</h3>
            <p>Thank you for your valued cooperation.</p>
            <p>Best Regards!</p>
          </div>

          <hr className="contact-divider"/>

          <div className="notes-block contact-block">
            <p>- Mua vé xem phim tập thể, hợp đồng khoán gọn:</p>
            <p><strong>Phòng Chiếu phim - (024) 35148647</strong></p>
            <br /> 
            <p>- Thuê phòng tổ chức Hội nghị, làm văn phòng, quảng cáo và các dịch vụ khác:</p>
            <p><strong>Phòng Dịch vụ - (024) 35142856</strong></p>
            <br/>
            <p>.TTCPQG</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PricingPage;
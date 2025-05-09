# Tài Liệu Yêu Cầu Kinh Doanh (BRD)

## Mục Tiêu
Mục tiêu chính của công cụ này là lấy danh mục các tỉnh thành quận huyện xã phường của Việt Nam bằng cách cào dữ liệu từ trang chính phủ

## Phạm Vi
1. Công cụ cào dữ liệu từ nguồn https://thongkehochiminh.gso.gov.vn/
2. Nó sẽ tạo ra các con bot để thu thập dữ liệu theo 2 bước : dò đường , lấy dữ liệu
3. Công cụ sẽ xuất dữ liệu định dang json
4. Dò đường sẽ quét qua từng link để tới mục tiêu
5. Lấy dữ liệu triết xuất dữ liệu từ 1 bảng chỉ định

## Yêu Cầu Chức Năng
1. Công cụ phải có khả năng cào dữ liệu từ các trang web được chỉ định.
2. Dữ liệu thu thập được phải được lưu trữ dưới định dạng JSON.
3. Hỗ trợ cấu hình để chỉ định bảng dữ liệu cần triết xuất.
4. Cung cấp giao diện dòng lệnh để khởi chạy và kiểm soát quá trình cào dữ liệu.

## Yêu Cầu Phi Chức Năng
1. Công cụ phải hoạt động ổn định và xử lý được khối lượng dữ liệu lớn.
2. Thời gian xử lý phải được tối ưu để giảm thiểu độ trễ.
3. Đảm bảo bảo mật khi truy cập và thu thập dữ liệu từ các nguồn.
4. Hỗ trợ ghi log để theo dõi và kiểm tra quá trình hoạt động.

## Giả Định và Ràng Buộc
1. Giả định rằng các trang web nguồn không thay đổi cấu trúc HTML trong thời gian ngắn.
2. Công cụ chỉ hoạt động với các trang web có cấu trúc dữ liệu rõ ràng.
3. Ràng buộc về quyền truy cập: chỉ cào dữ liệu từ các nguồn được phép.
4. Công cụ phải tuân thủ các quy định pháp luật về thu thập dữ liệu.

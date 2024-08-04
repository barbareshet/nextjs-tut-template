export const invoiceTemplate = `
    <!doctype html>
<html>
  <body>
    <div
      style='background-color:#F5F5F5;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#F5F5F5"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <div style="background-color:#f5f5f5;padding:16px 24px 16px 24px">
                <table
                  align="center"
                  width="100%"
                  cellpadding="0"
                  border="0"
                  style="table-layout:fixed;border-collapse:collapse"
                >
                  <tbody style="width:100%">
                    <tr style="width:100%">
                      <td
                        style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                      >
                        <div style="padding:0px 0px 0px 0px">
                          <div style="padding:0px 0px 0px 0px;text-align:left">
                            <a
                              href="https://remix.example.com"
                              style="text-decoration:none"
                              target="_blank"
                              ><img
                                alt="Remix"
                                src="https://d1iiu589g39o6c.cloudfront.net/live/platforms/platform_A9wwKSL6EV6orh6f/images/wptemplateimage_9TcdHLq5SpEkRADB/REMIX.png"
                                height="18"
                                style="height:18px;outline:none;border:none;text-decoration:none;vertical-align:middle;display:inline-block;max-width:100%"
                            /></a>
                          </div>
                        </div>
                      </td>
                      <td
                        style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="background-color:#ffffff;padding:16px 24px 24px 24px">
                <div style="padding:16px 0px 16px 0px">
                  <table
                    align="center"
                    width="100%"
                    cellpadding="0"
                    border="0"
                    style="table-layout:fixed;border-collapse:collapse"
                  >
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="font-size:14px;font-weight:normal;text-align:left;padding:0px 0px 0px 0px"
                            >
                              Invoice for {{name}}
                            </div>
                            <h1
                              style="font-weight:bold;text-align:left;margin:0;font-size:32px;padding:16px 0px 0px 0px"
                            >
                              $ {{amount}}
                            </h1>
                            <div
                              style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:0px 0px 0px 0px"
                            >
                              Paid August 1, 2023
                            </div>
                            <div style="padding:16px 0px 16px 0px">
                              <hr
                                style="width:100%;border:none;border-top:1px solid #EEEEEE;margin:0"
                              />
                            </div>
                            <div
                              style="font-size:14px;font-weight:normal;text-align:left;padding:0px 0px 0px 0px"
                            >
                              Download receipt
                            </div>
                          </div>
                        </td>
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="padding:0px 0px 0px 0px;text-align:right"
                            >
                              <a
                                href="http://remix.example.com/receipt/1923-2093"
                                style="text-decoration:none"
                                target="_blank"
                                ><img
                                  alt="Your invoice has been paid."
                                  src="https://d1iiu589g39o6c.cloudfront.net/live/platforms/platform_A9wwKSL6EV6orh6f/images/wptemplateimage_8yUGBZcXaAtTEofB/invoice-skeleton.png"
                                  style="outline:none;border:none;text-decoration:none;vertical-align:middle;display:inline-block;max-width:100%"
                              /></a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style="padding:8px 0px 8px 0px">
                  <table
                    align="center"
                    width="100%"
                    cellpadding="0"
                    border="0"
                    style="table-layout:fixed;border-collapse:collapse"
                  >
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:0px 0px 0px 0px"
                            >
                              Receipt number
                            </div>
                          </div>
                        </td>
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="font-size:14px;font-weight:normal;text-align:right;padding:0px 0px 0px 0px"
                            >
                              1923-2093
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style="padding:8px 0px 8px 0px">
                  <table
                    align="center"
                    width="100%"
                    cellpadding="0"
                    border="0"
                    style="table-layout:fixed;border-collapse:collapse"
                  >
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:0px 0px 0px 0px"
                            >
                              Invoice number
                            </div>
                          </div>
                        </td>
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="font-size:14px;font-weight:normal;text-align:right;padding:0px 0px 0px 0px"
                            >
                              2ABC1234-20923
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style="padding:8px 0px 8px 0px">
                  <table
                    align="center"
                    width="100%"
                    cellpadding="0"
                    border="0"
                    style="table-layout:fixed;border-collapse:collapse"
                  >
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:0px 0px 0px 0px"
                            >
                              Payment method
                            </div>
                          </div>
                        </td>
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="font-size:14px;font-weight:normal;text-align:right;padding:0px 0px 0px 0px"
                            >
                              VISA – 4252
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style="height:24px"></div>
              <div
                style="color:#474849;font-size:12px;font-weight:normal;text-align:left;padding:24px 24px 16px 24px"
              >
                Can we help? Just reply to this email.
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`
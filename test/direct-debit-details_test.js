let settings = require("../appSettings").settings;

var should = require('chai').should(),
    expect = require('chai').expect,
    supertest= require('supertest'),
    api = supertest(settings.api);

var { applicationId } = settings;

// need to add in case of self-signed certificate connection
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

describe('Direct Debit Details Service', function(){
    
    it("should return a 200 response, valid sortcode and account number", function(done){
        api.post("/sendevent")
            .set("Accept", 'application/json')
            .send({
                "type": "@NBS/HOME_FTB_CASE_DDDETAILS",
                "payload": {
                    "nameOnAccount": "vishal agarwal",
                    "accountNumber": "00019987",
                    "preferredPaymentDay": "1st",
                    "sortCode": "070246"
                },
                "meta": {
                    "applicationId": `${applicationId}`
                }
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                console.log("Error", err);
                console.log("Error reponse", res.body);

                expect(res.body).to.have.property("payload");
                expect(res.body.payload).to.not.equal(null);
                
                expect(res.body.payload).to.have.property("validateDirectDebitDetailsResult");

                expect(res.body.payload.validateDirectDebitDetailsResult).to.have.property("sortCodeAndAccountNumberCheckDecision");
                expect(res.body.payload.validateDirectDebitDetailsResult.sortCodeAndAccountNumberCheckDecision).to.equal("PASS");

                expect(res.body.payload.validateDirectDebitDetailsResult).to.have.property("sortCodeAndAccountNumberCheckDecisionMessage");
                expect(res.body.payload.validateDirectDebitDetailsResult.sortCodeAndAccountNumberCheckDecisionMessage).to.equal("You have setup your Direct Debit.");
                
                done();
            });
    })

    it("should return a 200 response, invalid sortcode and account number", function(done){
        api.post("/sendevent")
            .set("Accept", 'application/json')
            .send({
                "type": "@NBS/HOME_FTB_CASE_DDDETAILS",
                "payload": {
                    "nameOnAccount": "vishal agarwal",
                    "accountNumber": "00019987",
                    "preferredPaymentDay": "1st",
                    "sortCode": "070234"
                },
                "meta": {
                    "applicationId": `${applicationId}`
                }
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                // console.log("Error", err);
                // console.log("Error reponse", res.body);

                expect(res.body).to.have.property("payload");
                expect(res.body.payload).to.not.equal(null);
                
                expect(res.body.payload).to.have.property("validateDirectDebitDetailsResult");

                expect(res.body.payload.validateDirectDebitDetailsResult).to.have.property("sortCodeAndAccountNumberCheckDecision");
                expect(res.body.payload.validateDirectDebitDetailsResult.sortCodeAndAccountNumberCheckDecision).to.equal("SORT_CODE_FAIL");

                expect(res.body.payload.validateDirectDebitDetailsResult).to.have.property("sortCodeAndAccountNumberCheckDecisionMessage");
                expect(res.body.payload.validateDirectDebitDetailsResult.sortCodeAndAccountNumberCheckDecisionMessage).to.equal("Sorry, the sort code provided cannot be found. Please enter a valid sort code.");
                
                done();
            });
    })

    it("should return a 200 response, valid sortcode and invalid account number", function(done){
        api.post("/sendevent")
            .set("Accept", 'application/json')
            .send({
                "type": "@NBS/HOME_FTB_CASE_DDDETAILS",
                "payload": {
                    "nameOnAccount": "vishal agarwal",
                    "accountNumber": "01234567",
                    "preferredPaymentDay": "2nd",
                    "sortCode": "070246"
                },
                "meta": {
                    "applicationId": `${applicationId}`
                }
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                // console.log("Error", err);
                // console.log("Error reponse", res.body);

                expect(res.body).to.have.property("payload");
                expect(res.body.payload).to.not.equal(null);
                
                expect(res.body.payload).to.have.property("validateDirectDebitDetailsResult");

                expect(res.body.payload.validateDirectDebitDetailsResult).to.have.property("sortCodeAndAccountNumberCheckDecision");
                expect(res.body.payload.validateDirectDebitDetailsResult.sortCodeAndAccountNumberCheckDecision).to.equal("ACCOUNT_NUMBER_FAIL");

                expect(res.body.payload.validateDirectDebitDetailsResult).to.have.property("sortCodeAndAccountNumberCheckDecisionMessage");
                expect(res.body.payload.validateDirectDebitDetailsResult.sortCodeAndAccountNumberCheckDecisionMessage).to.equal("Sorry, the account number provided is not valid. Please enter a valid account number.");
                
                done();
            });
    })

    it("should return a 200 response, invalid sortcode and invalid account number", function(done){
        api.post("/sendevent")
            .set("Accept", 'application/json')
            .send({
                "type": "@NBS/HOME_FTB_CASE_DDDETAILS",
                "payload": {
                    "nameOnAccount": "vishal agarwal",
                    "accountNumber": "87654321",
                    "preferredPaymentDay": "23rd",
                    "sortCode": "070212"
                },
                "meta": {
                    "applicationId": `${applicationId}`
                }
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                // console.log("Error", err);
                // console.log("Error reponse", res.body);

                expect(res.body).to.have.property("payload");
                expect(res.body.payload).to.not.equal(null);
                
                expect(res.body.payload).to.have.property("validateDirectDebitDetailsResult");

                expect(res.body.payload.validateDirectDebitDetailsResult).to.have.property("sortCodeAndAccountNumberCheckDecision");
                expect(res.body.payload.validateDirectDebitDetailsResult.sortCodeAndAccountNumberCheckDecision).to.equal("SORT_CODE_FAIL");

                expect(res.body.payload.validateDirectDebitDetailsResult).to.have.property("sortCodeAndAccountNumberCheckDecisionMessage");
                expect(res.body.payload.validateDirectDebitDetailsResult.sortCodeAndAccountNumberCheckDecisionMessage).to.equal("Sorry, the sort code provided cannot be found. Please enter a valid sort code.");
                
                done();
            });
    })
});
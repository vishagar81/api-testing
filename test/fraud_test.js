let settings = require("../appSettings").settings;

var should = require('chai').should(),
    expect = require('chai').expect,
    supertest= require('supertest'),
    api = supertest(settings.api);

var { applicationId } = settings;

// need to add in case of self-signed certificate connection
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

describe('Fraud Service', function(){
    
    it("should return a 200 response, valid reason and comments", function(done){
        api.post("/sendevent")
            .set("Accept", 'application/json')
            .send({
                "type": "@NBS/HOME_FTB_CASE_FRAUD",
                "payload": {
                    "isAlreadyReferred": false,
                    "reason": "userReferral",
                    "comments": "Some referral comments"
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
                
                expect(res.body.payload).to.have.property("comments");
                expect(res.body.payload.comments).to.not.equal(null);
                expect(res.body.payload.comments).to.equal("Some referral comments");

                expect(res.body.payload).to.have.property("reason");
                expect(res.body.payload.reason).to.not.equal(null);
                expect(res.body.payload.reason).to.equal("userReferral");

                done();
            });
    })

    it("should return a 200 response, for a case marked fraud (manual)", function(done){
        api.post("/sendevent")
            .set("Accept", 'application/json')
            .send({
                "type": "@NBS/HOME_FTB_CASE_GET_FRAUD",
                "payload": {},
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

                expect(res.body).to.have.property("type");
                expect(res.body.payload).to.not.equal("@NBS/HOME_FTB_CASE_GET_FRAUD_RESULT");
                
                expect(res.body.payload).to.have.property("comments");
                expect(res.body.payload.comments).to.not.equal(null);
                expect(res.body.payload.comments).to.equal("Some referral comments");

                expect(res.body.payload).to.have.property("reason");
                expect(res.body.payload.reason).to.not.equal(null);
                expect(res.body.payload.reason).to.equal("userReferral");

                expect(res.body.payload).to.have.property("requestedBy");
                expect(res.body.payload.requestedBy).to.not.equal(null);
                expect(res.body.payload.requestedBy).to.equal("QA"); // TODO: check that

                expect(res.body.payload).to.have.property("requesterRole");
                expect(res.body.payload.requesterRole).to.not.equal(null);
                expect(res.body.payload.requesterRole).to.equal("MC");  // TODO: check that

                expect(res.body.payload).to.have.property("requestedDate");
                expect(res.body.payload.requestedDate).to.not.equal(null);

                done();
            });
    })

    
});
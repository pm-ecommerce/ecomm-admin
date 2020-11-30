import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AwsService {
  private readonly defaultOptions: any;
  public s3: AWS.S3;

  constructor() {
    this.defaultOptions = {
      ACL: 'public-read',
      Bucket: environment.awsBucket,
    };

    const credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: environment.awsPoolId,
    });

    AWS.config.update({
      region: environment.awsRegion,
      credentials
    });

    this.s3 = new AWS.S3();
  }

  upload(params = {}) {
    const options = { ...this.defaultOptions, ...params };
    return this.s3
      .upload(options)
      .promise();
  }

  listObjects(folder: string, bucket?: string) {
    return this.s3.listObjectsV2({ Bucket: bucket || this.defaultOptions.Bucket, Prefix: folder })
      .promise()
      .then((res) => {
        res.Contents = res.Contents
          .map((item) => {
            const Bucket = bucket || this.defaultOptions.Bucket;
            return { ...item, Bucket };
          })
          .filter((item) => item.Key.lastIndexOf('.') > -1);
        return res;
      });
  }
}

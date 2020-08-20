import React from 'react';
import { Image, Header, Segment } from 'semantic-ui-react';

const RenderResults = (people: WebApi.Entities.UserProfile[]) =>
	people.map((el) => {
		return {
			/* <Segment>
      <Header>
        {`${el.firstName} ${el.lastName}`}
        <Image href={el.avatar}>
      </Header>
  <p> {el.email}</p>
    </Segment> */
		};
	});

export default RenderResults;

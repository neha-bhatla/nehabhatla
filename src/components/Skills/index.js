import React from 'react';
import styled from 'styled-components';
import { skills } from '../../data/constants';

const Container = styled.div`
  text-align: center;
  padding: 50px 20px;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 20px;
`;

const Desc = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.secondary};
  max-width: 800px;
  margin: 0 auto 30px;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Skill = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const SkillTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 10px;
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  display: flex;
  align-items: center;
`;

const SkillImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const Skills = () => {
  return (
    <Container id="skills">
      <Title>Technical Skills</Title>
      <Desc>View my technical skills! </Desc>
      <SkillsContainer>
        {skills.map((skill, index) => (
          <Skill key={index}>
            <SkillTitle>{skill.title}</SkillTitle>
            <SkillList>
              {skill.skills.map((item, i) => (
                <SkillItem key={i}>
                  <SkillImage src={item.image} alt={item.name} />
                  {item.name}
                </SkillItem>
              ))}
            </SkillList>
          </Skill>
        ))}
      </SkillsContainer>
    </Container>
  );
};

export default Skills;